const extend = require('extend');
const PIDFactory = require('../utils/PIDFactory');
const conf = require('../utils/tools').GetAppConfig();
const isDevMode = process.env.NODE_ENV === 'development';

module.exports = {
    filter: function (req, res, next) {
        // 获取真实IP
        req.realIp = (function () {
            var forwarded = req.header('x-forwarded-for');
            var ip = '';

            if (forwarded) {
                ip = forwarded.split(',')[0];
            }
            else {
                ip = req.connection.remoteAddress;
            }
            return ip;
        })();

        req.pid = PIDFactory.createPID(req, res);

        if (!res.locals) {
            res.locals = {};
        }
        extend(res.locals, { // 模板可用数据
            query: req.query,
            app: {
                staticPath: isDevMode ? conf.serverConfig.cdn : '',
                configDomainUrl: conf.serverConfig.domainUrl,
                version: conf.version,
                devMode: isDevMode
            }
        });

       next();
    }
};