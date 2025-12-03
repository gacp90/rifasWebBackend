//Env
require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const robots = require('express-robots-txt'); 

const botBlocker = require('./middleware/bot');
const preventHotlink = require('./middleware/preventHotlink');

// Crear el servidor express
const app = express();

// BOOT ADN preventHotlink
app.use(botBlocker);
app.use(preventHotlink);

// CORS
app.use(cors());

//app.use(express.bodyParser({ limit: '50mb' }));
// READ BODY
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// ⬇️ Middleware para robots.txt
app.use(
    robots({
      UserAgent: '*',
      Disallow: ['/admin/', '/api/', '/cloud/'],
      Allow: ['/assets/', '/'],
      Sitemap: 'https://rifaexpres.com/assets/sitemap.xml',
    })
  );

// DIRECTORIO PUBLICO
app.use(express.static('public'));

// SPA
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en el Puerto', process.env.PORT);
});