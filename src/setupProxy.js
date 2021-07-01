const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
        target: '開発環境のaggregation-apiにする',
      changeOrigin: true,
    })
  );
};
