/**
 * app
*/
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const log4js = require('log4js');
const history = require('connect-history-api-fallback');

const errors = require('./lib/errors');
const logger = require('./lib/logger');
const conf = require('./lib/utils/tools').GetAppConfig();
const routerRigister = require('./lib/route');

const globalFilter = require('./lib/filter/global-filter');
const loginFilter = require('./lib/filter/login-filter');
const csrfFilter = require('./lib/filter/csrf-filter');

const express = require('express');
const app = express();

app.set("trust proxy", true);
app.set('port', process.env.PORT || conf.serverConfig.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(log4js.connectLogger(
    logger.getLogger('access'), {
        level: log4js.levels.INFO,
        format: '[:remote-addr :method :url :status :response-timems :content-length][:referrer HTTP/:http-version :user-agent]',
        nolog: /.+(\.(js|css|png|img|ico|png|jpg|gif|txt))$/
    }
));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
// static
app.use('/public', express.static(path.join(__dirname, 'public'),{
    cacheControl: false
}));

// filter
app.use(globalFilter.filter);
app.use(loginFilter.filter);
app.use(csrfFilter.filter);

routerRigister.route(app);
// fe
app.use(history({
    index:'/dist/index.html',
}));
// static
app.use('/dist', express.static(path.join(__dirname, 'dist'),{
    cacheControl: false
}));

// error
app.use(errors.domain);
app.use(errors.notFound);
app.use(errors.handler);

module.exports = app;
