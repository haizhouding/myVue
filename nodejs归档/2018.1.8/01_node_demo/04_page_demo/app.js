var express = require('express');
// 导入mysql配置文件
var db = require('./db');
// 导入mysql模块
// var mysql = require('mysql');
var fs = require('fs');


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

// console.log(mysql);
// console.log(db);


// 分页请求（走数据库的分页逻辑）
app.get('/loadUserList', (req, res) => {
    // 1、创建连接对象
    var connection = mysql.createConnection(db.mysql);
    // 2、连接
    connection.connect();

    // 考虑到分页应该从前端传过来至少2个参数
    // 1、pageNum：当前页码，2、pageSize：每页显示条数
    console.log(req.query);
    
    
    var sql = 'select * from user limit ?, ?';

    connection.query(sql, [parseInt(req.query.pageNum) * 10, parseInt(req.query.pageSize)], (err, result) => {
        if (err) {
            connection.end();
        }
        // 再去查询总数量
        var sql2 = 'select count(*) as pageCount from user';
        connection.query(sql2, (err2, result2) => {
            console.log(result2[0].pageCount);
            // 我们要把 总数据量 和 当前页的数据列表 拼在一起 返回给前端
            res.send({pageCount: result2[0].pageCount, userList: result});
            connection.end();
        });

        // res.send(result);
        // connection.end();
    });
});


// 插入mysql假数据的接口（在测试的时候调用一次即可！！！！）
function insertTestData () {
    console.log('插入mysql数据。。。。');
    // 1、创建连接对象
    var connection = mysql.createConnection(db.mysql);
    // 2、连接
    connection.connect();

    // var sql = "select first_name, salary from s_emp";
    // var params = ['Garmen'];
    // var sql = "select first_name, salary from s_emp where first_name = ?";
    // // 3、执行sql
    // connection.query(sql, params, (err, result) => {
    //     if (err) {
    //         // 4、关闭连接
    //         connection.end();
    //     }
        
    //     // console.log(result);
    //     res.send(result);

    //     // 4、关闭连接
    //     connection.end();
    // });

    // 造假数据 (往user表中插入100多条数据)
    var sql = 'insert into user (name, sex, age, addr) values (?, ?, ?, ?)';
    
    for (var i = 0; i < 103; i++) {
        connection.query(sql, ['liu' + i, '男' + i, 18 + i, '昌平' + i], (err, result) => {
            if (err) {
                connection.end();
            }
            console.log('ok');
        });
    }

    connection.end();
}

// insertTestData();

app.get('/testLocationData', (req, res) => {
    var rs = fs.createReadStream('./shop_data.json');
    var tempChunk = '';
    rs.on('data', chunk => {
        tempChunk += chunk;
    });

    rs.on('end', () => {
        var resultArr = [];
        var obj = JSON.parse(tempChunk);
        for (var tempShop of obj.shop_data) {
            if (tempShop.addr_city_code == 'bei_jing') {
                resultArr.push({
                    shop_name: tempShop.shop_name,
                    map_latitude: tempShop.map_latitude,
                    map_longitude: tempShop.map_longitude
                });
            }
        } 
        var ws = fs.createWriteStream('./location_data.json');
        var s = JSON.stringify(resultArr);
        ws.write(s);
    });
});

app.get('/getShopList', function (req, res) {
    // res.sendFile(__dirname + '/location_data.json');
    fs.readFile('./location_data.json', (err, data) => {
        // console.log(JSON.parse(data));
        var shopList = JSON.parse(data);

        //处理分页（需要知道显示第几页pageNo和每页显示的条目pageSize）
        var pageNo = parseInt(req.query.pageNo);
        var pageSize = parseInt(req.query.pageSize);

        var shopList2 = shopList.slice( pageNo * pageSize, (pageNo + 1) * pageSize);
        res.send({page_count: shopList.length, shop_list: shopList2});
    });
});

app.listen(8888, () => {
    console.log('数据分页服务启动成功。。。');
});