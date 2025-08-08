// middleware/preventHotlink.js
module.exports = function (req, res, next) {
  const allowedReferers = [
    'https://rifalaplaya.com',
    'https://www.rifalaplaya.com',
    'https://admin.rifalaplaya.com',
    'https://www.admin.rifalaplaya.com',
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
