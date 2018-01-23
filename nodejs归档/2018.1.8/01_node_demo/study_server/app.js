var express = require('express');
var fs = require('fs');

var qs = require('querystring');

var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var count = 1;
// 获取用户列表
app.get('/getUserList', function (req, res) {
    console.log('访问次数：', count++);
    var userList = [
        { name: '刘', age: 18},
        { name: '张', age: 20},
        { name: '王', age: 30},
        { name: '李', age: 40},
    ];

        
    // setTimeout(function () {
    //     res.send(userList);
    // }, 5000);
    res.send(userList);
});

// 根据用户名来获取用户详情信息
app.get('/getUserInfo', function (req, res) {
    var userList = [
        { name: '刘', age: 18, height: 172},
        { name: '张', age: 20, height: 173},
        { name: '王', age: 30, height: 174},
        { name: '李', age: 40, height: 175},
    ]
    
    console.log(req.query);

    for (var user of userList) {
        if (req.query.userName == user.name) {
            res.send(user);
        } 
    }
    res.send({});
});

// 测试post请求
app.post('/login', function (req, res) {
    var tempChunk = '';
    req.on('data', function (chunk) {
        tempChunk += chunk;
    });

    req.on('end', function () {
        // console.log(tempChunk);
        var data = qs.parse(tempChunk);
        console.log(data);
        if (data.user == 'admin' && data.pwd == '123') {
            res.end('{"code": 1, "user": "admin", "pwd": 123, "age": 18, "name": "小雪"}');
        } else {
            // 这里需要断开
            res.end('{"code": 0}');
        }
    });
});

// 验证登录
app.get('/checkLogin', function () {
    // 用户登录后会有一个状态改变，防止没有登录就进入到某个页面
});

// 测试jsonp
app.get('/getUserListJSONP', function (req, res) {
    var userList = [
        { name: '刘', age: 18},
        { name: '张', age: 20},
        { name: '王', age: 30},
        { name: '李', age: 40},
    ]
    res.jsonp(userList);
});

// 带参jsonp测试
app.get('/loginJSONP', function (req, res) {

    if (req.query.userName == 'admin' && req.query.pwd == '123') {
        res.jsonp({code: 0});
    }
    res.jsonp({code: 1});
});

app.get('/load.html', function (req, res) {
    res.sendFile(__dirname + '/load.html');
});

app.get('/getUserListJson', function (req, res) {
    res.sendFile(__dirname + '/jQuery专用.json');
});

app.get('/getCarList', function (req, res) {
    res.sendFile(__dirname + '/car.json');
});

app.listen(8888, function () {
    console.log('用户管理后台服务启动成功...');
})
