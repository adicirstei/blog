var express = require('express');
var auth = require('./auth.js');
var app = module.exports = express.createServer();

// Configuration

debugger;
auth.setup();
//=======================
//=======================
//auth.helpExpress(app);
exports = app;