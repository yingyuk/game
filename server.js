/*
* @Author: Yuk
* @Date:   2016-05-08 10:04:56
* @Last Modified by:   Yuk
* @Last Modified time: 2016-05-08 11:27:58
*/

'use strict';
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var app = express();
var port = 5000;

app.use(serveStatic(path.join(__dirname, '/src/')));
app.get('/',function (req,res) {
	// res.sendFile('index.html');
})
app.listen(port);
console.log('server listening on port 5000 ');
