const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config(); 
 
const app = express(); 
 
app.use(cors()); 
app.use(express.json()); 
 
app.get('/', (req, res) =
  res.json({ 
    status: '? ONLINE - RAILWAY', 
    message: 'Backend funcionando!', 
    timestamp: new Date().toISOString() 
  }); 
}); 
 
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
 
app.post('/api/scrape', (req, res) =
  const { url, site } = req.body; 
  res.json({ 
    success: true, 
    data: { 
      sku: 'SKU-' + site + '-' + Date.now(), 
      title: 'Produto do ' + site, 
      originalPrice: 'R$ 199,90', 
      finalPrice: 'R$ 159,90', 
      imageUrl: 'https://picsum.photos/300/200', 
      productUrl: url, 
      discountPercentage: '20%', 
      description: 'Produto de exemplo do ' + site, 
      coupon: 'CUPOM10' 
    } 
  }); 
}); 
 
app.listen(PORT, () =
  console.log('? Servidor rodando na porta ' + PORT); 
}); 
