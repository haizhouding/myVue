var http = require('http');
// 利用url模块可以让url变成对象
var url = require('url');

var fs = require('fs');

var querystring = require('querystring');

var server = http.createServer((req, res) => {
    // 设置编码
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    var urlObj = url.parse(req.url, true);
    // console.log(urlObj);

    var tempChunk = '';
    req.on('data', chunk => {
        tempChunk += chunk;
    });

    req.on('end', () => {
        // console.log(tempChunk);
        var chunkObj = querystring.parse(tempChunk);
        console.log(chunkObj);
    });
});

server.listen(8888, () => {
    console.log('服务启动成功');
});
