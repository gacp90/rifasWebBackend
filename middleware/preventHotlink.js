// middleware/preventHotlink.js
module.exports = function (req, res, next) {
  const allowedReferers = [
    'https://tucarrorifas.com',
    'https://www.tucarrorifas.com',
    'https://admin.tucarrorifas.com',
    'https://www.admin.tucarrorifas.com',
  ];

  const url = req.originalUrl || '';
  const isImage = url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);

  if (isImage) {
    const referer = req.get('Referer') || '';
    if (referer && !allowedReferers.some(domain => referer.startsWith(domain))) {
      return res.status(403).send('Hotlinking not allowed');
    }
  }

  next();
};
