const express = require('express'); 
const cors = require('cors'); 
const axios = require('axios'); 
const cheerio = require('cheerio'); 
require('dotenv').config(); 
 
const app = express(); 
 
app.use(cors()); 
app.use(express.json()); 
 
// Health check 
app.get('/', (req, res) =
  res.json({ 
    status: '? ONLINE - RAILWAY', 
    message: 'Backend de Scraping funcionando!', 
    timestamp: new Date().toISOString(), 
    version: '2.0.0 - Light Version' 
  }); 
}); 
 
// Rota de scraping simulada 
app.post('/api/scrape', async (req, res) =
  try { 
    const { url, site } = req.body; 
    console.log('?? Recebido:', site, '-', url); 
    await new Promise(resolve =, 1000)); 
 
    const mockProducts = { 
      amazon: { 
        sku: 'AMZ-' + Date.now(), 
        title: 'Echo Dot (5¦ gera‡Æo) Smart speaker com Alexa Cor Preta', 
        originalPrice: 'R$ 399,00', 
        finalPrice: 'R$ 349,00', 
        discountPercentage: '12%', 
        description: 'Smart speaker com Alexa - Cor Preta' 
      }, 
      mercadolivre: { 
        sku: 'ML-' + Date.now(), 
        title: 'Smartphone Samsung Galaxy A54 5G 128GB', 
        originalPrice: 'R$ 1.799,00', 
        finalPrice: 'R$ 1.499,00', 
        discountPercentage: '16%', 
        description: 'Smartphone Samsung Galaxy A54 5G 128GB' 
      } 
    }; 
 
      sku: 'GEN-' + Date.now(), 
      title: 'Produto do ' + site, 
      originalPrice: 'R$ 199,90', 
      finalPrice: 'R$ 159,90', 
      discountPercentage: '20%', 
      description: 'Produto extra¡do do ' + site 
    }; 
 
    const fullProductData = { 
      ...productData, 
      imageUrl: 'https://picsum.photos/400/300?random=' + Date.now(), 
      productUrl: url, 
      coupon: productData.discountPercentage ? 'CUPOM' + Math.floor(Math.random() * 15) : '' 
    }; 
 
    res.json({ 
      success: true, 
      data: fullProductData, 
      message: '? Produto do ' + site + ' processado com sucesso!' 
    }); 
 
  } catch (error) { 
    console.error('? Erro:', error); 
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno no servidor' 
    }); 
  } 
}); 
 
// Listar sites suportados 
app.get('/api/sites', (req, res) =
  res.json({ 
    success: true, 
    data: [ 
      { id: 'amazon', name: 'Amazon' }, 
      { id: 'mercadolivre', name: 'Mercado Livre' }, 
      { id: 'magalu', name: 'Magazine Luiza' }, 
      { id: 'natura', name: 'Natura' }, 
      { id: 'boticario', name: 'O Botic rio' }, 
      { id: 'shopee', name: 'Shopee' } 
    ] 
  }); 
}); 
 
app.listen(PORT, '0.0.0.0', () =
  console.log('?? Servidor LEVE rodando na porta ' + PORT); 
}); 
