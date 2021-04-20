const numCPUs = require('os').cpus().length;

module.exports = {
	apps: [
		{
			"name": "scm",
			"script": "./bin/www",
			"cwd": "./",
			"exec_mode": "cluster",
			"instances": numCPUs,
			"error_file": "./log/pm2/app-err.log",
			"out_file": "./log/pm2/app-out.log",
			"env": {
			"NODE_ENV": "production",
			"MICRO_CACHE": true
			}
		}
	]
}
