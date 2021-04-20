const path = require('path');
const fs = require('fs');

// QueryString
const QueryString = function(str) {
    var result = str.match(/[\?&][^\?&]+=[^\?&]+/g);

    if (result) {
        var keys = [];
        var params = {};

        for (var i = 0; i < result.length; i++) {
            var s = result[i].substring(1);
            var kv = s.match(/(.*)=(.*)/);
            if (kv) {
                keys.push(kv[1]);
                params[kv[1]] = kv[2];
            }
        }
        this.keys = keys;
        this.params = params;
    }
};

QueryString.prototype = {
    toString: function() {
        var ret = '';
        for (var i in this.keys) {
            var key = this.keys[i];
            var value = this.params[key];
            ret += key + '=' + value;
            if (i < this.keys.length - 1) {
                ret += '&';
            }
        }

        return ret;
    },
    set: function(key, value) {
        var pos = -1;
        for (var i in this.keys) {
            if (this.keys[i] === key) {
                pos = i;
            }
        }

        if (pos < 0) {
            this.keys.push(key);
        }

        this.params[key] = value;
    },
    get: function(key) {
        return this.params[key];
    }
};

// MatchSome
var MatchSome = function(url, list) {
    let match = false;
    list.some(function (regex) {
        return match = regex.test(url);
    });
    return match;
}

// GetAppConfig
const GetAppConfig = function() {    
    const filePath = path.resolve(__dirname, '../../package.json');
    const serverData = JSON.parse(fs.readFileSync(filePath));
    return serverData;
}

module.exports = {
    Serialize: function(params) {
        var ret = '';
        if (params) {
            var keys = Object.keys(params);

            keys.forEach(function(key, index) {
                var value = params[key];
                if (value === undefined) {
                    value = '';
                }

                ret += key + '=' + value;

                if (index < keys.length - 1) {
                    ret += '&';
                }
            });
        }
        return ret;
    },
    QueryString: QueryString,
    MatchSome: MatchSome,
    GetAppConfig: GetAppConfig
};