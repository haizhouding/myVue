// 利用require函数来加载 其他模块（文件）
// 在导入.js文件的时候，.js可以省略不写
var home = require('../home/home');

// 可以导入内置模块，直接写名字即可
var http = require('http');

console.log(http);

console.log(home);