var express = require('express');
var fs = require('fs');
// console.log(fs);
// var url = require('url');
var app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/getHotList', (req, res) => {
    res.sendFile(__dirname+'/getHotList.json');
});

app.get('/bestChoice', (req, res) => {
    res.sendFile(__dirname+'/bestChoice.json');
});

app.get('/getFaultGroup', (req, res) => {
    res.sendFile(__dirname+'/getFaultGroup.json');
});

app.get('/getFaultGroup', (req, res) => {
    res.sendFile(__dirname+'/getFaultGroup.json');
});

app.get('/getcomputerQuestion', (req, res) => {
    res.sendFile(__dirname+'/getcomputerQuestion.json');
});

app.get('/getPinpaiPhoneList', (req, res) => {
    res.sendFile(__dirname+'/getPinpaiPhoneList.json');
});
app.get('/getcitycode', (req, res) => {
    res.sendFile(__dirname+'/getcitycode.json');
});


// app.get('/city_data', (req, res) => {
//     res.sendFile(__dirname+'/city_data.json');
// });



app.get('/HotPinpai', (req, res) => {
    res.sendFile(__dirname+'/HotPinpai.json');
});

// -------------------------------------------------------------------------------------------------------
app.get('/city_data', (req, res) => {
    var rs = fs.createReadStream('./city_data.json');
    var tempTrunk = '';
    rs.on('data', function (trunk) {
        tempTrunk += trunk;
        // console.log(trunk.toString());
    });
    rs.on('end', function () {
        var cityObjList = JSON.parse(tempTrunk);
        // console.log(req.query);
        var resultArr = [];
        for (let cityObj of cityObjList.citylist) {
            if (req.query.cityname == cityObj.name) {
                resultArr.push(cityObj);
            }
        };
        res.send({cityArr:resultArr});
    });
    
    // res.end();
});


app.get('/shop_data', (req, res) => {
    var rs = fs.createReadStream('./shop_data.json');
    var tempTrunk = '';
    rs.on('data', function (trunk) {
        tempTrunk += trunk;
        // console.log(trunk.toString());
    });
    rs.on('end', function () {
        var shopListObj = JSON.parse(tempTrunk);
        // console.log(typeof(shopListObj));
        var result = [];
        for (let shopDataObj of shopListObj.shop_data) {
            if ( req.query.county == '选择区县') {
                if (req.query.province == shopDataObj.addr_city) {
                    result.push(shopDataObj);
                } 
            } else  if (req.query.province == shopDataObj.addr_city && req.query.county == shopDataObj.addr_area) {
                result.push(shopDataObj);
            };
        };


        var orderBy = req.query.orderBy;
        if (orderBy){
            result.sort((num1, num2) => {
                let value1 = num1[orderBy];
                let value2 = num2[orderBy];
                return value2 -value1;
            })
        }

        var pages = result.length;
        var pageSize = parseInt(req.query.pageSize);
        var pageNo = parseInt(req.query.pageNum);
        var lastResult = result.slice(pageSize * (pageNo - 1), pageNo * pageSize);
        // console.log(lastResult);
        

        console.log(req.query);

        res.send({total_count: pages, dataList: lastResult});

    });
    
    // res.end();
});


//监听端口号
app.listen(8888, function () {
    console.log('服务器启动成功');
});
 
