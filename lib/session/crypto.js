/**
 * AES 加密模块
 */

const extend = require('extend');
const crypto = require('crypto');

const Constants = require('../constants');
const conf = require('../utils/tools').GetAppConfig();

const Crypto = function(secretKey, encoding) {
    this.encoding = encoding || 'hex';
};

extend(Crypto.prototype, {
    /**
     * 加密
     *
     * @param data
     * @returns {*}
     */
    encrypt: function(data, iv) {
        const cipher = crypto.createCipheriv('aes-128-cbc', Constants.SECRETKEY, iv.substr(20,16));
        return cipher.update(data, 'utf8', this.encoding) + cipher.final(this.encoding);
    },
    /**
     * 解密
     *
     * @param data
     * @returns {*}
     */
    decrypt: function(data, iv) {
        const cipher = crypto.createDecipheriv('aes-128-cbc', Constants.SECRETKEY, iv.substr(20,16));
        return cipher.update(data, this.encoding, 'utf8') + cipher.final('utf8');
    }
});

const instance = new Crypto(Constants.SECRETKEY, conf.serverConfig.encoding);
module.exports = instance;