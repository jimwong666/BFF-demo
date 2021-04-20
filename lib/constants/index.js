/**
 * 通用的常量
 * 
 * @type {{COOKIE_MAX_AGE: string}}
 * 
 */

module.exports = {
    COOKIE_MAX_AGE: "1800000",

    WHITE_LIST : [
        /^\/login\/?.*$/,
        /^\/logout\/?.*$/,
        /^\/register\/?.*$/
    ],

    SECRETKEY: "ZB7BUJEvb$#3QLcL" // 1位

};