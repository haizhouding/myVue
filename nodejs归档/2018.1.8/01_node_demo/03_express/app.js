// 导入express模块
var express = require('express');

var fs = require('fs');

// 初始化
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

app.get('/home', (req, res) => {
    // console.log(req.query);
    // 发js对象数据转换成json
    // res.send(req.query);
    // res.sendFile();
    // __dirname 获取项目的根路径（绝对）
    // console.log(__dirname);
    // res.sendFile(__dirname + '/car.json');

    var rs = fs.createReadStream('./car.json');
    var tempChunk = '';
    rs.on('data', chunk => {
        tempChunk += chunk;
    })

    rs.on('end', () => {
        var dataObj = JSON.parse(tempChunk);
        console.log(dataObj);
        var flag = false;
        for (var listContentObj of dataObj.ListContents) {
            // console.log(listContentObj);
            if (req.query.pinyin == listContentObj.PinYin) {
                flag = true;
                res.send(listContentObj.GroupInfo);
            }
        }
        if (!flag) {
            res.send([]);
        }
        
    });
});


// 监听端口
app.listen(8888, function () {
    console.log('服务启动成功');
});
