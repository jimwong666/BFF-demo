const express = require('express');
const router = express.Router();

const backend = require('../../lib/backend');
const Session = require('../../lib/session');

const logger = require('../../lib/logger');

router.get('/', function(req, res, next) {
	logger.getLogger().info("【登出】" + Session.get(req, res).userIdEnc);
	Session.destroy(req, res);

	res.redirect('login');
});

module.exports = router;
