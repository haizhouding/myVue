var fs = require('fs');

// 创建读取文件流
var rs = fs.createReadStream('/Users/shengxuliu/Desktop/面试/面试终极分享JS篇/2017年前端面试题整理汇总100题.pdf');

// var count = 0;

// var tempChunk = '';

// rs.on('data', chunk => {
//     // console.log(++count);
//     // console.log(chunk);
//     tempChunk += chunk;
// });

// console.log('--- end ---');

// // 当读取完整后会触发 end 事件，  end数据是最后获取完整数据的事件（如果超过64k一定要在end下）
// rs.on("end", () => {
//     // console.log(tempChunk);
// })

// 创建写入流
var ws = fs.createWriteStream('./xxx.pdf');

/**
 * 文件拷贝
 */
// rs.on('data', chunk => {
//     ws.write(chunk);
// })

rs.pipe(ws);
