const FakeStoreApi = {
    // 拿到所有的商品
    fetchAllProducts: async () => { // asynch 函数返回一个 promise对象，可以使用 then 方法添加回调函数
        //fetch()接受一个URL字符串作为参数，默认向该网址发出 GET 请求，返回一个Promise 对象
        const res = await fetch('https://fakestoreapi.com/products');
        // 将 res 解析为 JSON
        const result = res.json();
        return result;
    },
    fetchProductById: async(productId) => {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`)
        const result = await res.json()
        return result
    },
    fetchProductsBySearchQuery: async(query) => {
        const res = await fetch("https://fakestoreapi.com/products")
        const result = await res.json()
        return result.filter((product) => product.title.toLowerCase().includes(query))
    },

}

export {FakeStoreApi}