const express = require('express');
const router = express.Router();

const backend = require('../../lib/backend');
const Session = require('../../lib/session');

const logger = require('../../lib/logger');

router.get('/', function(req, res, next) {
	res.render('login');
});

router.post('/', function(req, res, next) {
	let params = {
		userName: req.body.userName,
        password: req.body.password
	};
	
	backend.post('/login', params, req, res, function(data){
		logger.getLogger().info('【登录】 | POST | req.body.userName | req.realIp | /web/login | ' + JSON.stringify(data));

		if(data && data.retCode == 0){
			console.log(Session.get);
            Session.logon(req, res, data);
            res.redirect('/');
        }else{
            res.locals.error = data.error;
            res.locals.userName = req.body.userName;
            res.locals.password = req.body.password;
            res.render('login');
        }
	})
});

module.exports = router;
