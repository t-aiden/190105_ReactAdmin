/* 

1.Promise 构造函数： Promise(excuter){  }
  (1)  executor 函数 ： 执行器 （resolve，reject）=>{}
  (2)  resolve 函数： 内部定义成功时我们调用的函数 value => {}
  (3)  reject 函数： 内部定义失败时我们调用的函数 reason  => {}
  说明： executor 会在 Promise内部立即同步调用，异步操作在执行器中执行

2. Promise.prototype.then 方法： (onResolved,onRejected)=>{}
   (1) onResolved 函数： 成功的回调函数 （value）=> {}
   (2) onRejected 函数： 失败的回调函数 （reason）=> {}
   说明： 指定用于得到成功 value 的成功回调 和 用于得到失败 reason 的失败回调返回一个新的 promise对象

3. Promise.prototyoe.catch 方法： (onRejected) => {}
   (1)onRejected 函数： 失败的回调函数 （reason）=> {}

*/