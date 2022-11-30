/* 

  util.promisify 方法
      -- nodejs内置方法 promisify，promisify 属于 util 这个模块。
      -- 是一个错误优先的回调函数 （即（err,value）=> ...  回调作为最后一个参数），并返回一个返回 promise的版本
      
      
      注意： 在fs 模块中 异步的API 在回调中 err 几乎都是第一个参数


*/


// 引入 util 模块
const util = require('util');

// 引入 fs 模块
const fs  = require('fs');

// 返回一个新的函数 ，这个函数在调用后返回的结果就是一个 promise对象 
let mineReadFile = util.promisify(fs.readFile);

mineReadFile('./resource/content.txt').then(value=>{
    console.log(value.toString());

});