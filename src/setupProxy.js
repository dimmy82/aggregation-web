const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
        target: 'http://dev-k8s-node0206.ub-speeda.lan:32722',
      changeOrigin: true,
    })
  );
};
