# 高级Day 07 ![](http://www.yztcedu.com/images/logo.png)

# 封装Ajax

```javascript
var Ajax = {
	/*
	 * 参数解释
	 * method：请求方式
	 * url：请求地址
	 * param：请求参数
	 * successCallBackFn：数据请求成功回调函数
	 * failCallBackFn：数据请求失败回调函数
	 */
	load : function (method, url, param, successCallBackFn, failCallBackFn) {
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} else {
			throw new Error("不支持Ajax");
		}
		
		if (method == 'GET' || method == 'get') {
//			http://192.168.0.1:8080/test/xx?userName=刘升旭&age=18
			xhr.open(method, url + "?" + param, true);
			xhr.send(null);
		} else if (method == 'POST' || method == 'post') {
			xhr.open(method, url, true);
             xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			//如果是post请求，这个参数应该是JSON字符串格式
			xhr.send(param);
		} else {
			throw new Error("请求方式不正确！");
		}
		
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
//					请求成功后回调的函数
					successCallBackFn(JSON.parse(xhr.responseText));
				} else {
					failCallBackFn("请求失败！");
				}
			}
		}
	}
}
```



# 同源策略

## 什么是同源策略

​	 同源策略，它是由Netscape提出的一个著名的安全策略，现在所有的可支持javascript的浏览器都会使用这个策略。最初，它的含义是指，A网页设置的 Cookie，B网页不能打开，除非这两个网页"同源"。所谓"同源"指的是"**三个相同**"。

1. 协议相同

2. 域名相同

3. 端口号相同

   例如：http://www.yztcedu.com:80/index.html

   协议： http

   域名：www.yztcedu.com

   端口号：80(省略的时候默认是80)

   ​

   http://www.yztcedu.com/another.html	同源

   https://www.yztcedu.com/a.html	不同源 因为协议不同

   http://www.yztc.com/a.html	不同源	因为域名不同

   http://www.yztcedu.com:8080/a.html	不同源	因为端口号不同。

   要想同源，三个必须完全相同。

## 同源策略的目的

​	同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

## 同源策略的限制范围

​	随着互联网的发展，"同源政策"越来越严格。目前，如果非同源，共有三种行为受到限制。

（1） Cookie、LocalStorage 和 IndexDB 无法读取。

（2） DOM 无法获得。

**（3） AJAX 请求不能发送。**   



# AJAX中规避同源策略

​	在AJAX中，同源策略要求，AJAX只能发给同源的网址，否则就报错。

![](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-14/63159156.jpg)

## 使用JSONP规避同源

​	JSONP是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小。

​	JSONP是JSON with Padding 的简称，这里的Padding指的是向JSON 数据中添加函数名。

服务器会像下面这种格式返回数据，对JSON数据添加了一层函数

```javascript
callback({
  "name": "小雪",
  "age": 18
});
```

​	它的基本思想是，网页通过动态添加一个 script 元素，向服务器请求 JSON 数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

```html
<script>
  	// 这里是对应JSONP的回调函数
	function getXiaoxueFn (data) {
    	console.log(data);
    }

   	function loginFn (data) {
    	console.log(data);
 	}
</script>
<!-- jsonp跨域 -->
<!--不带自定义参数的-->
<script type="text/javascript" src="http://10.3.152.217:4100/getxiaoxue?callback=getXiaoxueFn"></script>
		
<!-- 带自定义参数的 -->
<script type="text/javascript" src="http://10.3.152.217:4100/login?callback=loginFn&user=admin&password=123456" ></script>
```

> 上面这种写法就是利用script可以跨域访问的原理，但这样写我们不能灵活控制，我们可以封装一个JSONP库来实现动态创建script标签。而且方便控制。

## 封装JSONP

```javascript
/*
	封装jsonp函数参数
	url：请求地址
	param：请求参数（对象类型，多个属性-值，表示多个参数）
	callbackFn：回调函数

*/

function jsonp (url, param, callbackFn) {
	//1、动态创建script标签
	var script = document.createElement("script");

	//2、拼接callback参数
	//生成回调函数名字
	var callbackName = "cb" + new Date().getTime();
	//将回调函数绑定在window的callbackName(注意：这是变量)属性上
	window[callbackName] = callbackFn;
	//拼接callback
	url += "?callback=" + callbackName; 
	
	//3、如果有自定义参数的话，需要拼接传进来的自定义参数
	if (param) {
		for (var propName in param) {
			url += "&" + propName + "=" + param[propName];
		}
	}
	console.log(url);
	
	//4、设置script的src属性为上面拼接好的url
	script.src = url;
	
	//5、把script标签加入到body中
	document.body.appendChild(script);
	
	//6、script标签加载完毕后后删除script标签
	script.onload = function () {
		document.body.removeChild(script);	
	}
}
```

> 使用JSONP的局限性：只能使用get请求，不能发送post请求。如果想要发送post请求，只能其他的途径

## 