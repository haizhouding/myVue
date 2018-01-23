// 文件操作相关需要导入 fs 模块
var fs = require('fs');

// console.log(fs);

/**
 * 1、判断某文件是否存在 
 */
// fs.exists('./01_HelloWorld.js', is_exists => {
    // if (is_exists) {
    //     console.log('存在');
    // } else {
    //     console.log('不存在');
    // }
// });

// 同步方法
// var is_exists = fs.existsSync('./01_HelloWorld.js');

// if (is_exists) {
//     console.log('存在');
// } else {
//     console.log('不存在');
// }

/**
 * 2、相对路径转换绝对路径
 */
// fs.realpath('./01_HelloWorld.js', (err, path) => {
//     if (err) {
//         console.log('转换失败');
//     } else {
//         console.log(path);
//     }
// });

/**
 * 3、修改文件名字
 */
// fs.rename('./test.js', './test2.js', err => {
//     if (err) {
//         console.log('修改失败');
//     } else {
//         console.log('修改成功');
//     }
// });

/**
 * 4、新建目录
 */
// fs.mkdir('./test_dir', 0777, err => {
//     if (err) {
//         console.log('新建目录失败');
//     } else {
//         console.log('新建目录成功');
//     }
// });

/**
 * 5、判断文件还是路径
 */
// fs.stat('./test2.js', (err, stats) => {
//     if (err) {
//         console.log('报错啦');
//     } else {
//         if (stats.isFile()) {
//             console.log(' 是文件 ');
//         } else if (stats.isDirectory()) {
//             console.log(' 是目录 ');
//         }
//     }
// })

/**
 * 6、读取目录
 */
// fs.readdir('./', (err, filesName) => {
//     if (err) {
//         console.log('报错啦');
//     } else {
//         console.log(filesName);
//     }
// });

console.log('--- end ---');