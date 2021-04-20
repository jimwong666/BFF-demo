var extend = require('extend');
var Session = require('../session');
var conf = require('./tools').GetAppConfig();

ParamExtender = function(){

};

extend(ParamExtender, {
    wrap(original, external){
        return extend(original,external);
    },
    wrapIdentify(params, req, res){
        if(typeof req == "undefined"){
            return params;
        }else{
            var session = Session.get(req, res);
            if(typeof params == "undefined"){
                params = {};
            }
            if(typeof params.headers == "undefined"){
                params.headers = {};
            }
            
            params.headers["X-TIMESTAMP"] = new Date();
            params.headers["user-agent"] = req.headers['user-agent'];
            params.headers["X-Forwarded-For"] = req.realIp;
            params.headers["X-ClientVersion"] = conf.version;
            params.headers["X-Token"] = params.headers['X-Token'] || session.xtoken;
            params.headers["X-ClientType"] = params.headers['X-ClientType'] || conf.serverConfig.clientType;

            return extend(params,{
                id: session.id,
                userIdEnc: session.userIdEnc
            });
        }
    }
});
module.exports = ParamExtender;