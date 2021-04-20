const domain = require('domain');
const logger = require('./logger');
const isDevMode = process.env.NODE_ENV === "development";

module.exports = {
    domain: function(req, res, next) {
        const reqd = domain.create();
        reqd.add(req);
        reqd.add(res);

        reqd.on('error', function(err) {
            res.on('close', function() {
                logger.getLogger().info('Disposing domain for url ' + req.url);
                reqd.dispose();
            });

            next(err);
        });

        reqd.run(next);
    },
    raise: function(req, res) {
        res.status(404);
        res.render('error', {
            error: "Page Not Found"
        });
    },
    notFound: function(req, res, next) {
        const err = new Error('Page Not Found');
        err.status = 404;
        next(err);
    },
    handler: function(err, req, res, next) {
        logger.getLogger().error('Request failed: "' + req.url + '"', '\n', err.stack);
        res.status(err.status || (isDevMode ? 500 : 404));
        res.render('error', {
            error: err.info
        });
    }
};