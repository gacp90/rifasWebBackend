// middleware/botBlocker.js
const badUserAgents = [
  /python-requests/i,
  /curl/i,
  /wget/i,
  /libwww/i,
  /httpclient/i,
  /java/i,
  /scrapy/i,
  /Go-http-client/i
];

module.exports = function (req, res, next) {
  const userAgent = req.headers['user-agent'] || '';
  if (badUserAgents.some(pattern => pattern.test(userAgent))) {
    return res.status(403).send('Forbidden');
  }
  next();
};
