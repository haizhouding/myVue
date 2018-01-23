var fs = require('fs');

/**
 * 1、读取文件
 */
// fs.readFile('./01_HelloWorld.js', 'utf-8', (err, data) => {
//     if (err) {
//         console.log('读取失败');
//     } else {
//         console.log(data);
//     }
// });

/**
 * 2、写文件
 */
// fs.writeFile('./demo.txt', 'abcd', {flag: 'a'}, err => {
//     if (err) {
//         console.log('写入失败');
//     } else {
//         console.log('写入成功');
//     }
// });

/**
 * 普通文件的拷贝(没有提供拷贝方法，我们需要自己来实现)
 * 写入模式，不写的话，默认是覆盖
 */
// fs.readFile('./demo.txt', 'utf-8', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         fs.writeFile('./demo2.txt', data, function (err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('拷贝成功！！！');
//             }
//         });
//     }
// });

// 如果要拷贝类似于图片这种非普通文本格式，建议使用默认的读取方式（buffer）
// fs.readFile('./a.png', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         fs.writeFile('./a2.png', data, function (err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('拷贝成功！！！');
//             }
//         });
//     }
// });
