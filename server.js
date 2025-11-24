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
    console.log(`?? Recebido: ${site} - ${url}`); 
    await new Promise(resolve =, 1000)); 
 
    const mockProducts = { 
      amazon: { 
        sku: `AMZ-${Date.now()}`, 
        title: 'Echo Dot (5¦ gera‡Æo) | Smart speaker com Alexa | Cor Preta', 
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
        title: 'Console Sony PlayStation 5 Edi‡Æo Digital', 
        originalPrice: 'R$ 4.499,00', 
        finalPrice: 'R$ 3.999,00', 
        discountPercentage: '11%', 
        description: 'Console Sony PlayStation 5 Edi‡Æo Digital SSD 825GB' 
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
        title: 'Perfume O Botic rio Malbec', 
        originalPrice: 'R$ 159,90', 
        finalPrice: 'R$ 127,90', 
        discountPercentage: '20%', 
        description: 'Perfume O Botic rio Malbec 100ml' 
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
 
      sku: `GEN-${Date.now()}`, 
      title: `Produto do ${site}`, 
      originalPrice: 'R$ 199,90', 
      finalPrice: 'R$ 159,90', 
      discountPercentage: '20%', 
      description: `Produto extra¡do do ${site}` 
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
      message: `? Produto do ${site} processado com sucesso!` 
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
 
// Status do servidor 
app.get('/api/status', (req, res) =
  res.json({ 
    status: 'online', 
    memory: process.memoryUsage(), 
    uptime: process.uptime(), 
    timestamp: new Date().toISOString() 
  }); 
}); 
 
app.listen(PORT, '0.0.0.0', () =
  console.log(`?? Servidor LEVE rodando na porta ${PORT}`); 
}); 
