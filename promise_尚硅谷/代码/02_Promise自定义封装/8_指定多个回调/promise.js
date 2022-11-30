
// 声明构造函数
function Promise(executor){
    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    // 声明属性
    this.callbacks = [];

    // 保存实例对象的 this 的值
    const self = this;   //  self  / that / _this

    // resolve 函数
    function resolve(data){
        // 判断状态,保证promise状态只能改变一次
        if(self.PromiseState !== 'pending') return;
        // 1.修改对象的状态）（promiseState）
        self.PromiseState = 'fulfilled'  // 也可以写成 resolved，都是成功的意思 
        // 2.设置对象结果值 （promiseResult）
         self.PromiseResult = data;
         // 调用成功的回调函数
        self.callbacks.forEach(item => {
            item.onResolved(data);
        })
    }

    // reject 函数
    function reject(data){
          // 判断状态，保证promise状态只能改变一次
          if(self.PromiseState !== 'pending') return;
         // 1.修改对象的状态）（promiseState）
         self.PromiseState = 'rejected'  ;// 也可以写成 resolved，都是成功的意思 
         // 2.设置对象结果值 （promiseResult）
          self.PromiseResult = data;
        // 调用失败的回调函数
         self.callbacks.forEach(item=>{
             item.onRejected(data);
         })
    }

    try{
         // 同步调用「执行器函数」
         executor(resolve,reject);
    }catch(e){
        //修改 promise 对象状态为 失败
        reject(e);
    }
   

}


// 添加 then 方法
Promise.prototype.then = function(onResolved,onRejected){
    // 调用回调函数 PromiseState
    if(this.PromiseState === 'fulfilled'){
        onResolved(this.PromiseResult);
    }
    if(this.PromiseState === 'rejected'){
        onRejected(this.PromiseResult);
    }

       // 判断 pending 状态
    if(this.PromiseState === 'pending'){
        //  保存回调函数
        this.callbacks.push({
            onResolved:onResolved,
            onRejected:onRejected
        });
    }

}