import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { generateBusinessXRayAudit, generateCompetitorComparison } from './src/server/geminiAuditor.ts';
import { POPULAR_INDIAN_EXAMPLES, getMockSampleAudit } from './src/server/sampleAudits.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Aimerger Business X-Ray API',
      timestamp: new Date().toISOString(),
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    });
  });

  app.get('/api/examples', (req: Request, res: Response) => {
    res.json({
      success: true,
      examples: POPULAR_INDIAN_EXAMPLES,
    });
  });

  app.post('/api/audit/generate', async (req: Request, res: Response) => {
    try {
      const {
        businessName,
        city,
        websiteUrl = '',
        instagramHandle = '',
        category = 'Local Business',
        language = 'en',
      } = req.body;

      if (!businessName || !city) {
        return res.status(400).json({
          success: false,
          error: 'Business name and city are required',
        });
      }

      console.log(`[API] Starting Business X-Ray for "${businessName}" in "${city}" (${language})`);
      const report = await generateBusinessXRayAudit({
        businessName,
        city,
        websiteUrl,
        instagramHandle,
        category,
        language,
      });

      res.json({
        success: true,
        report,
      });
    } catch (error: any) {
      console.error('[API] Audit generation error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Internal audit error',
      });
    }
  });

  app.post('/api/audit/compare', async (req: Request, res: Response) => {
    try {
      const { businessA, businessB, category = 'Local Business', language = 'en' } = req.body;

      if (!businessA?.name || !businessA?.city || !businessB?.name || !businessB?.city) {
        return res.status(400).json({
          success: false,
          error: 'Both business names and cities are required for competitor comparison.',
        });
      }

      console.log(`[API] Starting Competitor Battle: "${businessA.name}" vs "${businessB.name}"`);
      const comparisonReport = await generateCompetitorComparison({
        businessA,
        businessB,
        category,
        language,
      });

      res.json({
        success: true,
        comparison: comparisonReport,
      });
    } catch (error: any) {
      console.error('[API] Comparison error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to compare businesses',
      });
    }
  });

  app.post('/api/audit/retranslate', async (req: Request, res: Response) => {
    try {
      const { report, targetLanguage } = req.body;
      if (!report || !targetLanguage) {
        return res.status(400).json({ success: false, error: 'Missing report or targetLanguage' });
      }

      // Re-generate in target language
      const updated = await generateBusinessXRayAudit({
        businessName: report.businessName,
        city: report.city,
        websiteUrl: report.websiteUrl,
        instagramHandle: report.instagramHandle,
        category: report.category,
        language: targetLanguage,
      });

      res.json({ success: true, report: updated });
    } catch (error: any) {
      console.error('[API] Retranslate error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Mount Vite or serve static dist
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Aimerger Business X-Ray server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
