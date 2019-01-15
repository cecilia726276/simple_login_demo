const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/user/login',
        { target: 'http://localhost:3432' }
    ));
}