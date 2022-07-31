import React, { useState, useEffect } from 'react'
import Products from './components/Products/Products'
import NavBar from './components/NavBar/NavBar'
import Cart from './components/Cart/Cart'
import Checkout from './components/CheckoutForm/Checkout/Checkout'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import {commerce} from './lib/commerce'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const fetchProducts = async () => {
        const {data} = await commerce.products.list()
        setProducts(data)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddtoCart = async (productId, quantity) => {
        const {cart} = await commerce.cart.add(productId, quantity)
        setCart(cart)
    }

    const handleUpdateCart = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity})
        setCart(cart)
    }

    const handleRemoveCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId)
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty()
        setCart(cart)
    }

    const refreshCart = async() => {
        const {newCart} = await commerce.cart.refresh()
        setCart(newCart)
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
            setOrder(incomingOrder)
            refreshCart()
        } catch (error) {
            setErrorMessage(error.data.error.message)
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    return (
        <Router>
            <div>
                <NavBar cart={cart}/>
                <Routes>
                    <Route exact path="/" element={
                        <Products 
                            products={products} 
                            onAddToCart={handleAddtoCart}
                        />
                    }/>
                    <Route exact path="/cart" element={
                        <Cart 
                            cart={cart}
                            handleUpdateCart={handleUpdateCart}
                            handleRemoveCart={handleRemoveCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    }/>
                    <Route exact path="/checkout" element={
                        <Checkout 
                            handleCaptureCheckout={handleCaptureCheckout}
                            order={order}
                            errorMessage={errorMessage}
                            cart={cart}
                        />
                    }/>
                </Routes>
            </div>
        </Router>
    )
}

export default App