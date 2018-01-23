// 1、导入内置的http模块
var http = require('http');

// console.log(http);

// 2、创建服务
var server = http.createServer((req, res) => {
    // req是request的意思，获取客户端的请求对象，里面包含了各种请求信息
    // res是response的意思，是服务器响应对象
    console.log('----哈哈哈---');

    // 请求路径
    console.log(req.url);

    // 请求方式
    console.log(req.method);
    // 设置编码
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    
    // 实现一个简单的路由转发（根据请求路径不同，返回不同的结果）
    if (req.url == '/getUserList') {
        res.write('用户列表数据。。。');
    } else if (req.url == '/getDogList') {
        res.write('小狗列表数据。。。');
    } 
    
    // 返回数据可以用res的write方法（过后详细说下这个）
    // res.write('ok哈哈');

    // 记得一定要结束(切断连接) HTTP（底层是TCP面向连接） 三次握手原理
    res.end();
});

// 3、监听端口
server.listen(8888, () => {
    console.log('--- 服务开启... ---');
})