import { createContext, useContext, useState,useEffect } from "react"

const initialState = {
    cart: JSON.parse(window.localStorage.getItem("storage")) || [], // 当从本地取的值为空时，给cart 赋值[]，也不会报错
    cartItemCount: () => 0,
    addToCart: () => null,
    removeFromCart: () => null,
    increaseQuantity: () => null,
    decreaseQuantity: () => null,
}

const CartContext = createContext(initialState)

const useCart = () => useContext(CartContext)

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(initialState.cart)

    ///  监测购物车，当购物车数据改变后就存储到本地 localStorage
    useEffect(()=>{
        window.localStorage.setItem("storage",JSON.stringify(cart))
    },[cart])
    ///

    const cartItemCount = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0)
    }

    const addToCart = (product) => {
        const productIdx = cart.findIndex((item) => item.product.id === product.id)
        if (productIdx !== -1) {
            increaseQuantity(product.id)
        } else {
            setCart([...cart, { product, quantity: 1 }])
        }
    }

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.product.id !== productId))
    }

    const increaseQuantity = (productId) => {
        const copy = cart.slice()
        const productIdx = copy.findIndex((item) => item.product.id === productId)
        if (productIdx !== -1) {
            copy[productIdx].quantity += 1
            setCart(copy)
        }
    }

    const decreaseQuantity = (productId) => {
        const copy = cart.slice()
        const productIdx = copy.findIndex((item) => item.product.id === productId)
        if (productIdx !== -1 && copy[productIdx].quantity > 1) {
            copy[productIdx].quantity -= 1
            setCart(copy)
        }
    }

    return (
        <CartContext.Provider
            value={{ cart, cartItemCount, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
        >
            {children}
        </CartContext.Provider>
    )
}

export { useCart, CartProvider }
