import { Link } from "react-router-dom"

const Item = ({ data, addToCart }) => {

    const { id, image, title, price, discount } = data;
    const discountPrice = (price * discount).toFixed(2);

    return (
        <div className="card">
            <div className="grid">
                <div className="image">
                    <img src={image} alt="" />
                </div>
                <div className="title">
                    <Link to={`/product/${id}`} className="link titleLink">
                        {title}
                    </Link>
                </div>
                <div className="flex">
                    {discount === 1 ? (
                        <div>
                            <span className="price" style={{ marginRight: 15 }} >
                                ${price}
                            </span>

                        </div>
                    )
                        : (
                            <div>
                                <span className="price" style={{ marginRight: 15 ,color: "red", "textDecoration" : "line-through"}}>
                                    ${price}
                                </span>
                                <span className="price" style={{ marginRight: 15 }}>
                                    discount:${discountPrice}
                                </span>

                            </div>
                        )

                    }
                    <div className="cart" onClick={addToCart}>
                        <img className="cartImg" src="/cart.svg" alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export { Item }