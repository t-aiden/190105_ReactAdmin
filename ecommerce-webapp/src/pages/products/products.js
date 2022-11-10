import { useEffect, useState } from "react"
import { FakeStoreApi } from '../../services/fake-store-api'
// useSearchParams是一种hooks的方式更加方便的操作搜索参数  https://juejin.cn/post/7026994491680620557
import { useSearchParams } from "react-router-dom"
import { Item } from "../../components/item"
import { useCart } from "../../context/cart"
import { Sort } from '../../components/sort/sort'

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [query] = useSearchParams();
    const [sortType, setSortType] = useState(null);// 按钮的种类
    const [isPriceAscending, setIsPriceAscending] = useState(false);   // 判断 按价格排序的 方向
    const [isCategoryAscending, setIsCategoryAscending] = useState(false);   // 判断 按种类排序的 方向
    const [isRatingAscending, setIsRatingAscending] = useState(false);// 判断 按评价排序的 方向

    const { addToCart } = useCart();

    const searchQuery = query.get('q');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const products = searchQuery ? await FakeStoreApi.fetchProductsBySearchQuery(searchQuery) : await FakeStoreApi.fetchAllProducts();
           
            products.map((data)=>
               {
                    
                    if(data.price < 100){
                       data.discount = 1;
                    }else if(data.price > 200){
                        data.discount = 0.8;
                    }else{
                        data.discount = 0.9;
                    }
                    return data

               }
                
                
            )


           // 在 sort.js中 已赋值setSortType("price"),类似于 sortType === "price"
            if(sortType === "price"){  

                if(isPriceAscending){ 
                    products .sort(function(a, b){
                        return a.price - b.price
                    })

                }else{
                    products .sort(function(a, b){
                        return b.price - a.price
                    })
                }
                
            } else if (sortType === "category"){
                if(isCategoryAscending){
                    products.sort(function (a, b){
                        // 如果是 number数组排序的可以用减 - ，如果是string要用大于 > 
                        if(a.category > b.category){
                            return 1
                        }
                       
                    })

                }else{
                    products.sort(function (a, b){
                        // 如果是 number数组排序的可以用减 - ，如果是string要用大于 > 
                        if(b.category > a.category){
                            return -1
                        }
                       
                    })
                }

            }else{
                if(isRatingAscending){
                    products.sort(function (a, b){
                        return a.rating.rate - b.rating.rate
                       
                    })

                }else{
                    products.sort(function (a, b){
                        return b.rating.rate - a.rating.rate
                       
                    })
                }
                

            }

            setProducts(products);
            setLoading(false)
        }

        fetchProducts().catch(console.error)
    }, [sortType,isPriceAscending,isCategoryAscending,isRatingAscending,searchQuery])


    if (!loading && searchQuery && !products.length) {
        return (
            <div className="container">
                <div className="product py-2">
                    <div className="details p-3">No products found matching your query.</div>
                </div>
            </div>
        )

    }

    return (
        <>
            <div className="container">
                <Sort 
                  sortType={sortType}
                  setSortType={setSortType}
                  isPriceAscending={isPriceAscending}
                  setIsPriceAscending={setIsPriceAscending}
                  isCategoryAscending={isCategoryAscending}
                  setIsCategoryAscending={setIsCategoryAscending}
                  isRatingAscending={isRatingAscending}
                  setIsRatingAscending={setIsRatingAscending}
                />
                <div className="products my-5">
                    <div className="grid">
                        {loading ? (
                            <div className="loader" />
                        ) : (
                            products.map((product) => (
                                <Item 
                                 key={product.id} data={product} addToCart={() => addToCart(product)} 
                                
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export { Products }
