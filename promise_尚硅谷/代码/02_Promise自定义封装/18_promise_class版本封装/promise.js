class Promise {
    // 构造方法
    constructor(executor) {
        // 添加属性
        this.PromiseState = 'pending';
        this.PromiseResult = null;
        // 声明属性
        this.callbacks = [];


        // 保存实例对象的 this 的值
        const self = this;   //  self  / that / _this

        // resolve 函数
        function resolve(data) {
            // 判断状态,保证promise状态只能改变一次
            if (self.PromiseState !== 'pending') return;
            // 1.修改对象的状态）（promiseState）
            self.PromiseState = 'fulfilled'  // 也可以写成 resolved，都是成功的意思 
            // 2.设置对象结果值 （promiseResult）
            self.PromiseResult = data;
            // 调用成功的回调函数
            self.callbacks.forEach(item => {
                setTimeout(() => {
                    item.onResolved(data);

                })

            })
        }

        // reject 函数
        function reject(data) {
            // 判断状态，保证promise状态只能改变一次
            if (self.PromiseState !== 'pending') return;
            // 1.修改对象的状态）（promiseState）
            self.PromiseState = 'rejected';// 也可以写成 resolved，都是成功的意思 
            // 2.设置对象结果值 （promiseResult）
            self.PromiseResult = data;
            // 调用失败的回调函数
            self.callbacks.forEach(item => {
                setTimeout(() => {
                    item.onRejected(data);
                })
            })
        }

        try {
            // 同步调用「执行器函数」
            executor(resolve, reject);
        } catch (e) {
            //修改 promise 对象状态为 失败
            reject(e);
        }

    }
    //  then 方法封装
    then(onResolved, onRejected) {
        const self = this;

        // 判断回调函数参数
        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason;
            }
        }
        // 判断函数类型并设置默认值
        if (typeof onResolved !== 'function') {
            onResolved = value => value;
            // 等价于  value => {return value}:
        }


        return new Promise((resolve, reject) => {
            // 封装函数
            function callback(type) {
                try {
                    // 获取回调函数的执行结果
                    let result = type(self.PromiseResult);
                    // 判断
                    if (result instanceof Promise) {  // 监测 result 是否是 promise 的一个实例
                        // 如果是 Promise 类型的对象
                        result.then(v => {
                            resolve(v);

                        }, r => {
                            reject(r);

                        })

                    } else {
                        // 结果的对象状态为 成功
                        resolve(result);
                    }

                } catch (e) {
                    reject(e);

                }


            }

            // 调用回调函数 PromiseState
            if (this.PromiseState === 'fulfilled') {
                setTimeout(() => {
                    callback(onResolved);
                })
            }
            if (this.PromiseState === 'rejected') {
                setTimeout(() => {
                    callback(onRejected);

                })
            }

            // 判断 pending 状态
            if (this.PromiseState === 'pending') {
                //  保存回调函数
                this.callbacks.push({
                    onResolved: function () {
                        callback(onResolved);
                    },
                    onRejected: function () {
                        callback(onRejected);
                    },
                });
            }

        })

    }

    // catch 方法
    catch(onRejected) {
        return this.then(undefined, onRejected);

    }

    // resolve 方法
    //需要用 static 进行描述，表明  resolve 不属于实例对象，属于类
    static resolve(value) {
        // 返回promise对象
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(v => {
                    resolve(v);
                }, r => {
                    reject(r);

                })


            } else {
                // 设置状态为 成功
                resolve(value);

            }

        })
    }

    // reject 方法
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    // all 方法
    static all(promises) {
        // 返回结果为 Promise 对象
        return new Promise((resolve, reject) => {
            // 声明变量
            let count = 0;
            let arr = [];
            // 遍历
            for (i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    // 得知对象的状态是成功
                    // 每个 promise 对象都成功
                    count++;
                    // 将当前 promise 对象成功的结果 存入到数组中
                    arr[i] = v;
                    // 判断
                    if (count === promises.length) {
                        resolve(arr);
                    }

                }, r => {
                    reject(r);
                })
            }

        });

    }

    // race 方法
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    // 修改返回对象的状态为 成功
                    resolve(v);
                }, r => {
                    // 修改返回对象的状态为 失败
                    reject(r);

                })
            }
        })

    }


}




