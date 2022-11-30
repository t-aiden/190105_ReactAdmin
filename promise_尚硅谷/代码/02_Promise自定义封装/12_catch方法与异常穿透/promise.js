
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
    const self = this;

    // 判断回调函数参数
     if(typeof onRejected !== 'function'){
         onRejected = reason => {
             throw reason;
         }
     }
     // 判断函数类型并设置默认值
     if(typeof onResolved !== 'function'){
         onResolved = value => value;
         // 等价于  value => {return value}:
     }


     return new Promise((resolve,reject)=>{
        // 封装函数
        function callback(type){
           try{
               // 获取回调函数的执行结果
               let result = type(self.PromiseResult);
               // 判断
               if(result instanceof Promise){  // 监测 result 是否是 promise 的一个实例
                   // 如果是 Promise 类型的对象
                   result.then(v=>{
                       resolve(v);

                   }, r =>{
                       reject(r);

                   })

               }else{
                   // 结果的对象状态为 成功
                   resolve(result);
               }

           }catch(e){
               reject(e);

           }
           

        }

       // 调用回调函数 PromiseState
       if(this.PromiseState === 'fulfilled'){
           callback(onResolved);
       }
       if(this.PromiseState === 'rejected'){
          callback(onRejected);
       }

       // 判断 pending 状态
       if(this.PromiseState === 'pending'){
           //  保存回调函数
           this.callbacks.push({
               onResolved:function(){
                   callback(onResolved);
               },
               onRejected:function(){
                  callback(onRejected);
               },
           });
       }

    })

    

}

// 添加 catch 的方法 （catch接收一个参数，就是失败的回调）
Promise.prototype.catch = function(onRejected){
    return this.then(undefined,onRejected);

}
