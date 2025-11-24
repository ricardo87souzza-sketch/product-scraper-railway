const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS configurado
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Rate limiting para free tier
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Muitas requisições da sua IP, tente novamente em 15 minutos.'
});
app.use(limiter);

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check - IMPORTANTE para Railway
app.get('/', (req, res) => {
  res.json({
    status: '✅ ONLINE - RAILWAY',
    service: 'Product Scraper Backend',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    message: 'Deploy realizado com sucesso no Railway! 🚀'
  });
});

// Rota de status detalhado
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    nodeVersion: process.version
  });
});

// Rota de scraping simulada
app.post('/api/scrape', async (req, res) => {
  try {
    const { url, site } = req.body;

    if (!url || !site) {
      return res.status(400).json({
        success: false,
        error: 'URL e site são obrigatórios'
      });
    }

    console.log(`🔍 Scraping request: ${site} - ${url}`);

    // Simular tempo de processamento
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Dados simulados baseados no site
    const mockProducts = {
      amazon: {
        sku: `AMZ-${Date.now()}`,
        title: 'Echo Dot (5ª geração) | Smart speaker com Alexa | Cor Preta',
        originalPrice: 'R$ 399,00',
        finalPrice: 'R$ 349,00',
        discountPercentage: '12%',
        description: 'Smart speaker com Alexa - Cor Preta'
      },
      mercadolivre: {
        sku: `ML-${Date.now()}`,
        title: 'Smartphone Samsung Galaxy A54 5G 128GB',
        originalPrice: 'R$ 1.799,00',
        finalPrice: 'R$ 1.499,00',
        discountPercentage: '16%',
        description: 'Smartphone Samsung Galaxy A54 5G 128GB'
      },
      magalu: {
        sku: `MGL-${Date.now()}`,
        title: 'Console Sony PlayStation 5 Edição Digital',
        originalPrice: 'R$ 4.499,00',
        finalPrice: 'R$ 3.999,00',
        discountPercentage: '11%',
        description: 'Console Sony PlayStation 5 Edição Digital SSD 825GB'
      },
      natura: {
        sku: `NAT-${Date.now()}`,
        title: 'Kit Natura Homem Essencial Eau de Toilette',
        originalPrice: 'R$ 189,90',
        finalPrice: 'R$ 151,90',
        discountPercentage: '20%',
        description: 'Kit Natura Homem Essencial Eau de Toilette'
      },
      boticario: {
        sku: `BOT-${Date.now()}`,
        title: 'Perfume O Boticário Malbec',
        originalPrice: 'R$ 159,90',
        finalPrice: 'R$ 127,90',
        discountPercentage: '20%',
        description: 'Perfume O Boticário Malbec 100ml'
      },
      shopee: {
        sku: `SHP-${Date.now()}`,
        title: 'Fone de Ouvido Bluetooth Sem Fio',
        originalPrice: 'R$ 129,90',
        finalPrice: 'R$ 89,90',
        discountPercentage: '30%',
        description: 'Fone de Ouvido Bluetooth Sem Fio'
      }
    };

    const productData = mockProducts[site] || {
      sku: `GEN-${Date.now()}`,
      title: `Produto do ${site}`,
      originalPrice: 'R$ 199,90',
      finalPrice: 'R$ 159,90',
      discountPercentage: '20%',
      description: `Produto extraído do ${site}`
    };

    const fullProductData = {
      ...productData,
      imageUrl: `https://picsum.photos/400/300?random=${Date.now()}`,
      productUrl: url,
      coupon: productData.discountPercentage ? `CUPOM${Math.floor(Math.random() * 15)}` : ''
    };

    res.json({
      success: true,
      data: fullProductData,
      message: `✅ Produto do ${site} extraído com sucesso!`
    });

  } catch (error) {
    console.error('❌ Erro no scraping:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno no servidor'
    });
  }
});

// Rota para listar sites suportados
app.get('/api/sites', (req, res) => {
  const supportedSites = [
    { 
      id: 'amazon', 
      name: 'Amazon', 
      example: 'https://www.amazon.com.br/dp/B09B8VGCR8',
      spreadsheet: 'https://docs.google.com/spreadsheets/d/1Qzc09H13Vwsq-6kqFwnXPHCHLTVlYgFyWthx8_0wSPk/'
    },
    { 
      id: 'mercadolivre', 
      name: 'Mercado Livre',
      example: 'https://www.mercadolivre.com.br/produto',
      spreadsheet: 'https://docs.google.com/spreadsheets/d/1bAKHGxyvEEjYMja4-PAbtrNbeRmvOSnnZLotWLIPda4/'
    },
    { 
      id: 'magalu', 
      name: 'Magazine Luiza',
      example: 'https://www.magazinevoce.com.br/magazinesouzza21/p/',
      spreadsheet: 'https://docs.google.com/spreadsheets/d/1odYdZIdiK8jGvDDcXRPBrU6XOuDQ_dGnFHbrwHaJ-Ds/'
    },
    { 
      id: 'natura', 
      name: 'Natura',
      example: 'https://www.minhaloja.natura.com/consultoria/ricardosouzza/p/',
      spreadsheet: 'https://docs.google.com/spreadsheets/d/1vB6XHmfh0B0_YdfMQ5JrrbHetpdvj3O4CFMta4MeJ9E/'
    },
    { 
      id: 'boticario', 
      name: 'O Boticário',
      example: 'https://minhaloja.boticario.com.br/loja-ricardoconceicaosouza-22809826/produto/',
      spreadsheet: 'https://docs.google.com/spreadsheets/d/1j0QyUHjiFJhBCGb80vVyM8-qT0vVUSQwfyWTup015QQ/'
    },
    { 
      id: 'shopee', 
      name: 'Shopee',
      example: 'https://shopee.com.br/produto',
      spreadsheet: 'https://docs.google.com/spreadsheets/d/1YnJRqOC3GXnd3Flod0FErqYKYAK609X6wKY4aOLhtRQ/'
    }
  ];

  res.json({
    success: true,
    data: supportedSites
  });
});

// Rota para teste de scraping em lote
app.post('/api/scrape-batch', async (req, res) => {
  try {
    const { urls } = req.body;
    
    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({
        success: false,
        error: 'Array de URLs é obrigatório'
      });
    }

    console.log(`🔄 Processando lote com ${urls.length} URLs`);

    // Simular processamento em lote
    const results = [];
    for (let i = 0; i < Math.min(urls.length, 5); i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const url = urls[i];
      const site = Object.keys(sitePatterns).find(key => url.includes(key)) || 'generic';
      
      results.push({
        url,
        site,
        success: true,
        data: {
          sku: `${site.toUpperCase()}-BATCH-${i}-${Date.now()}`,
          title: `Produto ${i+1} do lote - ${site}`,
          originalPrice: `R$ ${(Math.random() * 500 + 50).toFixed(2)}`,
          finalPrice: `R$ ${(Math.random() * 400 + 40).toFixed(2)}`,
          imageUrl: `https://picsum.photos/300/200?random=${i}`,
          productUrl: url,
          discountPercentage: `${Math.floor(Math.random() * 40)}%`,
          description: `Produto ${i+1} extraído em processamento em lote`,
          coupon: Math.random() > 0.3 ? `CUPOM${Math.floor(Math.random() * 25)}` : ''
        }
      });
    }

    res.json({
      success: true,
      data: results,
      message: `✅ Lote processado: ${results.length} produtos extraídos`
    });

  } catch (error) {
    console.error('❌ Erro no processamento em lote:', error);
    res.status(500).json({
      success: false,
      error: 'Erro no processamento em lote'
    });
  }
});

// Padrões de sites para detecção automática
const sitePatterns = {
  amazon: 'amazon',
  mercadolivre: 'mercadolivre',
  magalu: 'magazinevoce',
  natura: 'minhaloja.natura',
  boticario: 'boticario',
  shopee: 'shopee'
};

// Rota para detectar site automaticamente
app.post('/api/detect-site', (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL é obrigatória'
      });
    }

    const detectedSite = Object.entries(sitePatterns).find(([key, pattern]) => 
      url.includes(pattern)
    );

    if (detectedSite) {
      res.json({
        success: true,
        data: {
          site: detectedSite[0],
          confidence: 'high',
          message: `Site detectado: ${detectedSite[0]}`
        }
      });
    } else {
      res.json({
        success: false,
        data: {
          site: 'unknown',
          confidence: 'low',
          message: 'Site não reconhecido'
        }
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro na detecção do site'
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Erro não tratado:', err);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});