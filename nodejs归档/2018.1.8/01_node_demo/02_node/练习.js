// 1、导入内置的http模块
var http = require('http');

var fs = require('fs');

// 2、创建服务
var server = http.createServer((req, res) => {
    // 设置编码
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    
    // 实现一个简单的路由转发（根据请求路径不同，返回不同的结果）
    if (req.url == '/getUserList') {
        var rs = fs.createReadStream('./jQuery专用.json');
        var tempChunk = '';
        rs.on('data', chunk => {
            tempChunk += chunk;
        });

        rs.on('end', () => {
            console.log(tempChunk);
            res.write(tempChunk);
            // res.send(tempChunk);
            // res.write('ssss');
            res.end();
        });
    } 
});

// 3、监听端口
server.listen(8888, () => {
    console.log('--- 服务开启... ---');
})