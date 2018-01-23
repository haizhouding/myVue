# express框架讲解

## 什么是express?

node的一个第三方模块，功能和http模块相类似，可以用来做路由，但是需要手动安装该模块



## 安装

首先假定你已经安装了 [Node.js](https://nodejs.org/)，接下来为你的应用创建一个目录，然后进入此目录并将其作为当前工作目录。

```
$ mkdir myapp
$ cd myapp

```

通过 `npm init` 命令为你的应用创建一个 `package.json` 文件。 欲了解 `package.json` 是如何起作用的，请参考 [Specifics of npm’s package.json handling](https://docs.npmjs.com/files/package.json)。

```
$ npm init

```

此命令将要求你输入几个参数，例如此应用的名称和版本。 你可以直接按“回车”键接受默认设置即可，下面这个除外：

```
entry point: (index.js)

```

键入 `app.js` 或者你所希望的名称，这是当前应用的入口文件。如果你希望采用默认的 `index.js` 文件名，只需按“回车”键即可。

接下来安装 Express 并将其保存到依赖列表中：

```
$ npm install express --save
```



## 使用express框架搭建web服务器

### 使用express模块搭建http服务

**引入模块：**`var express = require*('express');`

**初始化：**`var app = express();`

**设置路由条目：**`app.get(‘接口名’，回调函数);`

**监听端口号：**

```javascript
app.listen(8888, function () {
    console.log('load success');
})	
```

### 使用express模块设置路由条目

**get请求：**`app.get('/', function (req, res){}）`

**post请求：**`app.post('/list', function (req, res) {}）`

示例：

```javascript
var express = require('express');
var app = express();

app.get('/index', function (req, res) {
    res.send('welcome');
});
app.get('/login', function (req, res) {
    res.send('please enter your author');
})
app.listen(8888, function () {
    console.log('load success');
})

```

### 使用express模块向前端发送数据

**向前端发送数据：**`res.send('要发送的数据');`

**向前端发送文件：**`res.sendFile(‘页面的绝对路径’);`

**回顾：如何把相对路径转换为绝对路径?**

> way1:
>
> 引入fs模块，该模块下的realpath方法:`var realPath = fs.realpathSync('form.html');`

> way2:
>
> 使用：``__dirname+'/文件名'``，把相对路径拼接为绝对路径



示例：

```javascript
var express = require('express');
var app = express();

app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/success.html')
})
app.listen(8888, function () {
    console.log('load success');
})
```



### 获取前端提交上来的数据

**获取get提交的数据：**`req.query`值就是一个对象类型，拿来可用

**获取post提交上来的数据：**

```javascript
var express = require('express'),
    qs = require('querystring');
var app = express();

app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/success.html')
    console.log(req.query);
})

app.post('/', function (req, res) {
    var temp = '';
    req.on('data', function (chunk) {
        temp += chunk;
    });
    req.on('end', function () {
    //    把字符串转换为对象
        var dataObj = qs.parse(temp);
        console.log(dataObj);
    })
})
app.listen(8888, function () {
    console.log('load success');
})

```

### 设置跨域访问

```javascript
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
```

