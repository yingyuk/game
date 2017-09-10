/*
* @Author: Yuk
* @Date:   2016-05-08 10:04:56
* @Last Modified by:   Yuk
* @Last Modified time: 2016-05-10 09:40:37
*/

'use strict';
var express = require('express');
var path = require('path');
var app = express();
var port = 5000;

app.use(express.static(__dirname + '/docs'));
// app.get('/',function (req,res) {
// })
app.listen(port);
console.log('server listening on port 5000 ');
