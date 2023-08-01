const { defineConfig } = require('@vue/cli-service')
/** 在平台注册的应用名称 */
const appName = 'yourAppCode'

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      library: `${appName}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${appName}`
    }
  },
  devServer: {
    /** local develop */
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.use('/', function (req, res, next) {
        const allowOrigins = ['http://localhost:4001', 'http://localhost:4005'];
        const _origin = req.headers.origin;
        if (allowOrigins.includes(_origin)) {
          res.setHeader('Access-Control-Allow-Origin', _origin);
        } else {
          res.setHeader('Access-Control-Allow-Origin', '*');
        }
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'uc-authorization,field,session,cbim-cityid,citycode,cbim-citycode,entid,env,accountid,appcode,applicationname,sessionkey,session-key,cbim-projectid,cbim-accountid,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,XRequested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization'
        );
        if (req.method.toLowerCase() === 'options') {
          return res.writeHeader(204).end();
        }
        next();
      });

      return middlewares;
    },
    proxy: {}
  }
})
