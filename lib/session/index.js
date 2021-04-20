const extend = require('extend');
const uuid = require('uuid');

const crypto = require('./crypto');
const logger = require('../logger');

const Session = function () {
    
};

extend(Session, {
    logon: function (req, res, logon) {
        const COOKIE_DOMAIN = req.headers.host;
        var opts = {domain:COOKIE_DOMAIN, httpOnly: false, sameSite: false};
        var current = Session.get(req, res);
        var session = {
            id: current.id,
            userIdEnc: logon.userIdEnc,
            loginName: logon.loginName,
            userName: logon.userName,
            gender: logon.gender,
            telphone: logon.mobilePhone,
            email: logon.comEmail,
            info: logon.comInfoFullStatus,
            status: logon.status, // 近期1天/1周/1个月/3个月/半年/1年活动
            xtoken: logon.xtoken
        };
        res.cookie('session', crypto.encrypt(JSON.stringify(session), req.pid), opts);
        res.cookie('xToken', logon.xtoken, opts);
    },
    /**
     * 调用远程认证服务创建会话
     * TODO: 账号互通
     * @param req
     * @param res
     * @param callback
     */
    create: function (req, res, callback) {
        
    },
    /**
     * 获取会话内容
     *
     * @param req
     */
    get: function (req, res) {
        const COOKIE_DOMAIN = req.headers.host;

        // logger.getLogger().info(req.hasOwnProperty('cookies'), req.cookies.session, 'Cookie, Session');
        var token = req.hasOwnProperty('cookies') ? req.cookies.session : null;
        var ret = {};
        if (token) {
            try {
                ret = JSON.parse(crypto.decrypt(token, req.pid));
            }
            catch (e) {
                this.destroy(req, res);
                logger.getLogger().error('Invalid session token: ' + token + '\n' + e);
            }
        }
        else {
            var opts = {domain: COOKIE_DOMAIN, httpOnly: false, sameSite: false};
            var session = {
                id: uuid.v4()
            };
            
            // 创建未认证的会话
            res.cookie('session', crypto.encrypt(JSON.stringify(session), req.pid), opts);
            ret = session;
        }
        ret.userIdEnc = ret.userIdEnc;

        return ret;
    },
    set: function (req, res, hash) {
        const COOKIE_DOMAIN = req.headers.host;

        var session = Session.get(req, res) || {};
        var opts = {domain: COOKIE_DOMAIN, httpOnly: false, sameSite: false};

        session = extend(session, hash);
        res.cookie('session', crypto.encrypt(JSON.stringify(ret), req.pid), opts);

        return session;
    },
    /**
     * 销毁会话
     *
     * @param req
     * @param res
     */
    destroy: function (req, res) {
        const COOKIE_DOMAIN = req.headers.host;
        var opts = {domain: COOKIE_DOMAIN, expires: new Date(1), httpOnly: false, sameSite: false};

        res.cookie('session', '', opts);
        res.cookie('xToken', '', opts);
    },

});
module.exports = Session;

