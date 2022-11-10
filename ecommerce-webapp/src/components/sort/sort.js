
const Sort = ({sortType,setSortType,isPriceAscending,setIsPriceAscending, isCategoryAscending,setIsCategoryAscending,isRatingAscending,setIsRatingAscending
}) => {
    return (
        <div className="container">
            <div className="tab">
                <div className="label">排序</div>
                <div id="tab">
                    <button onClick={
                        ()=>{
                        setSortType('price');// 触发 按价格 排列
                        setIsPriceAscending(!isPriceAscending) // 触发 新的排序方向 是 之前的相反方向

                    }
                        }>按价格</button>
                    <button onClick={
                        ()=>{
                            setSortType('category'); // 触发 按种类 排列
                            setIsCategoryAscending(!isCategoryAscending) // 触发 新的排列方向  是  之前的相反方向

                        }
                        }>按种类</button>
                    <button onClick={
                        ()=>{
                            setSortType('rating');// 触发 按评价 排列
                            setIsRatingAscending(!isRatingAscending) // 触发 新的排列方向 是 之前的相反方向

                        }
                        }>按评价</button>
                </div>

            </div>
        </div>
    )


}

export { Sort }