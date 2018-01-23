# 一、Node.js介绍

## node.js 是什么

简单的说 Node.js 就是运行在服务端的 JavaScript。

​	Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 

​	Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 

​	Node.js 的包管理器 npm，是全球最大的开源库生态系统。node所有的模块，都可以在npm中找到并下载使用

​	Node.js全面支持ES6

[API文档](http://nodejs.cn/api/)



## 环境安装

node环境下载地址：[点击下载](https://nodejs.org/en/download/)

根据操作系统选择不同平台的安装包，下载完毕后双击安装包即可安装。

安装完毕后在控制台(windows系统使用DOS窗口或者linux终端)输入以下命令测试是否安装成功：

查看node版本号：`node -v`

node安装好后，会自动把npm也安装好（除非你安装的时候没有勾选那个选项）

查看npm版本号:`npm -v`

输入以上命令，只要控制台能打印出版本号就说明已经安装成功，否则需要重新安装。



## 如何使用node

### 1、指令运行

将编写好的js代码，在终端中进入到该目录，使用`node xxx.js` 运行

### 2、REPL运行

REPL是Node自带的**交互式解释器**，类似于windows中的DOS、Unix/Linux中的shell，可以输入命令，并接收到系统的响应。我们可以在REPL中直接调试js代码。

我们在终端中使用`node` 命令进入到REPL环境，连续两次”ctr+c”命令，退出该环境。



# 二、WEB服务器入门（node版本HelloWorld）

## 什么是web服务器

Web服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，可以向浏览器等Web客户端提供文档， 也可以放置网站文件，让全世界浏览；可以放置数据文件，让全世界下载。目前最主流的三个Web服务器是Apache Nginx IIS。



## 创建web服务器程序

### 1、引入内置的http模块

```javascript
var http = require("http");
```

### 2、创建http服务

#### 2.1 创建http服务

```javascript
var server = http.createServer(function (req, res) {
   
});
```

创建服务时，传入了一个回调函数作为参数，该回调函数会在收到客户端请求时触发执行。回电函数中的两个参数：

**req：**请求对象，可以从该参数中获取到请求方法（`req.method`）、请求路径(`req.url`)、请求参数等信息

**res：**响应对象，可以通过该参数向客户端发送信息(`res.write()`/`res.end()`)、发送页面(`res.sendFile()`)

#### 2.2. 配置路由

**路由**就是根据客户端请求的不同路径，向前端发送不同的页面、数据

示例：如果请求的是`/index`则返回`welcome to my home`，如果请求的是`/login`则返回`please login`

```javascript
var server = http.createServer(function (req, res) { 
    if (req.url == '/index') {                       
        res.write('welcome to my home');             
    } else if (req.url == '/login') {              
        res.write('please login');              
    } 
    // 结束这次请求
    res.end();                                       
});                                                  
```

### 3、监听端口号

设置完服务和路由条目后，还需要让该服务监听某一个服务器端口号。

**端口号：**计算机用来提供服务的逻辑接口，（类比人的五官：每个小孔提供不同的功能）如：http服务是经过80端口提供。

**知名端口：**由操作系统占用的端口，这些端口我们不能监听，一般在前2000或3000编号的端口是系统专用的知名端口。

**自定义端口:**计算机总共有*65536*个端口(编号从0——65535)，除了知名端口外，其他的端口可以被第三方开发人员监听使用，但是一个端口同时只能提供一种服务，如果某个端口已经开启某个服务，则不能重复使用该端口。端口号越大，被占用的可能性越小。

```javascript
server.listen(8888, function () { 
    console.log('服务启动成功。。')   
})               
```

`listen()`方法中包含一个number类型的值，表示要监听的端口号。还有回调函数，当服务启动完毕后会触发该服务

完整代码示例：

```javascript
// 1、引入内置http模块
var http = require("http");
// 2、创建服务
var server = http.createServer(function (req, res) {
    console.log(req);
    console.log('-------');
    console.log(req.url);
    console.log(req.method);
    // 路由 
    if (req.url == "/index") {
        res.write("welcome to index.");
    } else if (req.url == "/login") {
        res.write("please login.");
    }
  
    // 断开连接
    res.end();
});

// 3、监听端口号
server.listen(8888, function () {
    console.log('success');
});
```



# 三、文件模块（fs）

文件模块提供了对本地磁盘中的文件读写、创建、删除以及文件路径（目录）操作的相关方法，模块名称为`fs`。

要使用`fs`模块的相关方法，必须先引入该模块:`require('fs')`

## 目录相关操作

### 1、判断某文件是否存在

```javascript
var fs = require('fs');
/**
 * 参数1：要判断某个文件的路径
 * 参数2：匿名回调函数（参数是否存在的布尔值）
 */
// 异步
fs.exists('./a.js', function (is_exists) {
   console.log(is_exists);
})

// 同步
var is_exists = fs.existsSync('./a.js');
console.log(is_exists);
```

### 2、相对路径转换成绝对路径

```javascript
var fs = require('fs');
/**
 * 学习这个主要为了将来学习express需要用到绝对路径。
 *  参数1：要转换的相对路径
 *  参数2：匿名回调函数（参数1：转换失败的对象 参数2：转换成功后的绝对路径）
 */
 fs.realpath('./ab.js', function (err, path) {
    if (err) {
        console.log(err);
    } else {
        console.log(path);
    }    
 })
```

### 3、修改文件名字

```javascript
/**
 * 参数1：要修改文件的路径
 * 参数2：修改后的文件的路径（这里要注意最好保持路径一致，如果不一致就是删除 + 新建的操作）
 * 参数3：失败回调函数
 */
fs.rename("./test.js", "./" + new Date().getTime() + "test2.js", function (err) {
    if (err) {
        console.log(err);
    } else { 
        console.log("修改成功！！！");
    }
})
```

### 4、新建目录

```javascript
/**
 * 参数1：新建目录的路径
 * 参数2：新建目录所拥有的权限（0777表示所有任何用户的任何权限。。）
 * 参数3：失败回调函数
 */

 fs.mkdir('./new_dir', 0777, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('新建目录成功！！！');
    }
 });
```

### 5、判断是文件还是路径

```javascript
/**
 * 参数1：要判断文件或目录的路径
 * 参数2：回调函数（参数1：错误对象 参数2：回调文件或目录信息对象）
 */
fs.stat('./cart1', function (err, stats) {
    if (err) {
        console.log(err);
    } else {
        console.log(stats);
        if (stats.isFile()) {
            console.log("是文件");
        } else if (stats.isDirectory()) {
            console.log("是目录");
        }
    }
});
```

### 6、读取目录

```javascript
/**
 * 读取目录
 * 参数1：读取目录的路径
 * 参数2：回调函数（参数1：错误对象 参数2：目录所包含的文件和子目录的数组）
 */
fs.readdir('/Users/shengxuliu/Desktop/nodeDemo', function (err, files) {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
    }
})
```

## 文件读取操作

### 1、读取文件

```javascript
/**
 * 读取文件
 * 参数1：要读取的文件路径
 * 参数2：（可选）：读取格式（默认是Buffer对象格式）
 * 参数3：回调函数（参数1：错误对象 参数2：读取的数据）
 */
fs.readFile('./test.html', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        // console.log(data.toString());
    }
});
```

### 2、写入文件

```javascript
/**
 * 写文件
 * 参数1：写入文件的路径（如果不存在则会新创建出该文件）
 * 参数2：写入的内容
 * 参数3：（可选，默认覆盖）：写入的模式，flag：a 是追加写入，flag：w 是覆盖 
 * 参数4：失败回调函数
 */
fs.writeFile('./demo.png', '你们好啊。。。', {
    flag: 'a'
}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("写入成功！");
    }
})
```

### 3、文件拷贝

普通文本

```javascript
/**
 * 文件的拷贝(没有提供拷贝方法，我们需要自己来实现)
 */
fs.readFile('./demo.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        fs.writeFile('./demo2.txt', data, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('拷贝成功！！！');
            }
        });
    }
});
```

特殊格式

```javascript
// 如果要拷贝类似于图片这种非普通文本格式，建议使用默认的读取方式（buffer）
fs.readFile('./a.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        fs.writeFile('./a2.png', data, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('拷贝成功！！！');
            }
        });
    }
});
```

同步方式也可以

```javascript
// 同步的操作也可以，先读取，在写入
var data = fs.readFileSync('./a.png');
console.log(data);
var is_sucss = fs.writeFileSync('./a3.png', data);
console.log(is_sucss);
```



## 文件流操作

**使用管道流操作与普通读写操作的区别：**管道流操作使用流式读取、写入文件，每读取64k文件就可以执行一次写入操作；而普通读写操作需要先把文件全部读取进内存后，才进行写入，对于大文件的读写操作，容易造成内存溢出（爆仓）。

**http服务向客户端发送文件、post请求的参数都是通过管道流进行的**



### 使用管道流实现文件的读写操作

**创建文件读取流：**`fs.createReadStream(读取文件路径)`

**读取流的data事件：**读取流每读取64k文件时，触发一次该事件，我们可以在该事件中对读取出来的数据进行操作

#### 1、读取文件

```javascript
var fs = require("fs");

// 创建读取流
var rs = fs.createReadStream('/Users/shengxuliu/Desktop/享学贷微信进件操作手册v3.1.pptx');

// 读取数据的时，可以通过data事件来获取到结果，
// 每次读取64k文件大小时候，会触发一次改事件函数
var count = 0;
var tempChunk = null;
rs.on('data', function (chunk) {
    // console.log(chunk);
    console.log(++count);
    tempChunk += chunk;
    // console.log(chunk.toString());
});

// 当读取完整后会触发 end 事件，  end数据是最后获取完整数据的事件（如果超过64k一定要在end下）
rs.on("end", function () {
    console.log(tempChunk);
})
```

#### 2、写入文件

**创建文件写入流：**`fs.createWriteStream(写入文件路径)`

**写入流的write方法：**该方法需要一个参数，参数是要写入的内容

```javascript
// 创建写入流
var ws = fs.createWriteStream("./demo3.txt", {flags: "a"});
// 使用write方法来写入数据
ws.write("哈哈，你在干什么。。。");
```

#### 3、文件拷贝（大文件）

```javascript
// 做一个文件拷贝功能
var rs = fs.createReadStream('./test.html');
var ws = fs.createWriteStream('./test副本.html');

rs.on("data", function (chunk) {
    // 这里需要解释下ws写入的原理 和 rs读入的原理
    // 一个从仓库拿出来，另外一个人搬到另外一个仓库
    // 其实rs会从硬盘读取数据后 存储到内存中，然后ws在从内存中往硬盘中写入
   // rs读取的速度要比ws写入的速度快，rs每次读取完后，不会等待ws
    // 如果是超级大的文本拷贝的话，内存容易爆掉。。
    ws.write(chunk);
});
```

**读取流的pipe方法：**该方法可以直接把读取出来的数据写入进写入流，不需要监听data事件

```javascript
var rs = fs.createReadStream('./test.html');
var ws = fs.createWriteStream('./test副本.html');
// pipe方法写入数据的时候，会等当前读出来的数据全部写入之后，才进行下一次的读取操作，内存充分利用，
// 但是读取时间会比之前长。
rs.pipe(ws);
```

# 四、node的HTTP模块深入讲解

## 设置GET服务器

### 获取get提交的请求参数

url模块下的parse方法可以把请求的url由字符串转为对象(url.parse(req.url，true))，第二个参数给true,可以让请求参数也变成对象类型

`var urlObj = url.parse(req.url, true);`

示例：获取通过get提交进服务器的参数以及请求的路径：

```javascript
var http = require('http'),
    url = require('url');

var server = http.createServer(function (req, res) {
    // 路径转换
    var urlObj = url.parse(req.url, true);
    console.log(urlObj.path); // 获取请求的路径
    console.log(urlObj.query); // 获取get提交的参数

});

server.listen(8888, function () {
    console.log('load success');
})
```

### 把用户请求的页面发送到客户端

使用文件的读写操作把存在服务器中的文件写进res中：

```javascript
var rs = fs.createReadStream('index.html');
rs.pipe(res);
```

**用户请求页面找不到的情况**

如果用户请求的文件在服务器中不存在，就利用状态码返回对应的编码:

```javascript
res.statusCode = 404；
res.end(‘not found’)
```



示例代码：

```javascript
var http = require('http'),
    url = require('url'),
    fs = require('fs');

var server = http.createServer(function (req, res) {
    // 路径转换
    var urlObj = url.parse(req.url, true);
    // 访问主页,把index.html文件发送出去,login页面,验证通过,把success.html发送出去
    if (urlObj.pathname == '/' || urlObj.pathname == '/index') {
        var rs = fs.createReadStream('./index.html');
        rs.pipe(res);
    } else if (urlObj.pathname == '/login') {
        // 验证用户名和密码
        if (urlObj.query.user == '123' && urlObj.query.pass == '123') {
            var rs = fs.createReadStream('./success.html');
            rs.pipe(res);
        } else {
            var rs = fs.createReadStream('./error.html');
            rs.pipe(res);
        }
    } else {
        res.statusCode = 404;
        res.end('404');
    }
});

server.listen(8888, function () {
    console.log('load success');
})
```

## 设置POST服务器

### 获取post提交上来的参数

POST方式在传递数据时，使用Stream的方式传递，所以可以使用读取流的data事件获取post的参数：

```javascript
req.on('data', function (chunk) {
        console.log(chunk.toString());
    })
```

注意：获取到的数据是一个字符串类型的，在取值时依然很不方便，这时候就可以使用'querystring'这个第三方帮我们进行转对象操作

**安装querystring模块：**`npm install querystring`

在页面中引入模块后，就可以进行类型转换了：

```javascript
 var data = qs.parse(temp);
```

综合代码：

```javascript
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    qs = require('querystring');

var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url);

    var temp = '';
    req.on('data', function (chunk) {
        console.log(chunk.toString());
        temp += chunk;
    });
    req.on('end',function () {
        var data = qs.parse(temp);
        console.log(data);
    })
});

server.listen(8888, function () {
    console.log('success');
})
```

