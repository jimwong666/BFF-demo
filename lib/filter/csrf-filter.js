/**
 * @author guozhaodong
 * 判断链接是否通过Token校验
 */

const Session = require('../session');
const Constants = require('../constants');
const tools = require('../utils/tools');

module.exports = {
    filter: function (req, res, next) {
        const notMatchWhitelist = !tools.MatchSome(req.url, Constants.WHITE_LIST);
        const session =  Session.get(req, res);
        const xToken = req.header('x-token') || req.body['x-token'] || req.query['x-token'];

        if(notMatchWhitelist && !(req.method === 'GET') && !(xToken && decodeURIComponent(xToken) === session.xToken)){
            res.send({
                retCode: '-1',
                retMsg: '非法操作！'
            });
        }else{
            next();
        }

    }
};