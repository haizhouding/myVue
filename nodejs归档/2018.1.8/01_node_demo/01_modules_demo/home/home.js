// console.log(module);

// console.log(module.exports);

// module.exports 就是当前模块导出的对象
// module.exports.pageName = 'home页面';

// console.log(module.exports === exports);

exports = {
    name: '嘎嘎'
}

module.exports = exports;

// exports.aaa = 22;

// console.log(module.exports === exports);

// var pageName = 'home页面';

// var say = function () {
//     console.log('哈哈');
// }

// module.exports = {
//     pageName,
//     say
// }