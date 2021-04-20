/**
 * 日志模块
 *
 * @author qiumingsheng
 */
const log4js = require('log4js');

const conf = require('./utils/tools').GetAppConfig();
const distPath = conf.serverConfig.logDist ||'log';
const isDevMode = process.env.NODE_ENV === "development";

const appenders = {
    "console": {
      type: "console"
    }
},
categories = {
    "console":{
      appenders: ['console'],
      level: 'info'
    }
};

const params = ['access', 'default'];
for (let i in params){
    let name = params[i];
    appenders[name] = { 
        type: 'file', 
        filename: distPath + '/' + name + '.log',
        maxLogSize: 10485760,
        backups: 5,
    };
    categories[name] = { appenders: isDevMode ? [name, 'console'] : [name], level: 'info'};
}
log4js.configure({
    appenders,
    categories
});

let loggers = {};

module.exports = {
    getLogger: function(category) {
        var logger = loggers[category];

        if (!logger) {
            var name = category || 'default';
            logger = log4js.getLogger(name);
            logger.info('Logger "' + name + '" initialized.');
            loggers[category] = logger;
        }
        return logger;
    }
};

