var http = require('http');
// 利用url模块可以让url变成对象
var url = require('url');

var fs = require('fs');

var server = http.createServer((req, res) => {
    // 设置编码
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    // console.log(req.url);
    var urlObj = url.parse(req.url, true);
    // console.log(urlObj);
    if (urlObj.pathname == '/xxxPDF') {
        // 这里的res响应对象 原理 和 ws写入流一样
        fs.createReadStream('./xxx.pdf').pipe(res);
    } else if (urlObj.pathname == '/home') {
        if (parseInt(urlObj.query.num) > 5) {
            res.write('页面A。。。');
        } else {
            res.write('页面B。。。');
        }
        res.end();
    }
});

server.listen(8888, () => {
    console.log('服务启动成功');
});
