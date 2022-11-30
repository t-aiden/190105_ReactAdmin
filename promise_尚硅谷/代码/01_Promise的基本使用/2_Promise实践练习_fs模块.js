// fs 是 nodejs 的 一个模块
// 引入 fs 模块
const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');


/////  回调函数 形式
//  readFile()  是fs 内置的一个方法 用于读取文件
/* fs.readFile('./resource/content.txt',(err,data)=>{
    // 如果出错，则抛出错误
    if(err) throw err;
    //否则 输出文件内容
    console.log(data);
   
});
 */


//// Promise 形式  (用 Promise封装fs的文件操作)
let p = new Promise((resolve,reject)=>{
    fs.readFile('./resource/content.txt',(err,data)=>{
        // 如果出错
        if(err) reject(err);
        // 如果成功
        resolve(data);
    });

});

// 调用 then
p.then(value=>{
    console.log(value.toString());
}, reason => {
    console.log(reason);
})
   

