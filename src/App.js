import React, { useState, useEffect } from 'react'
import Products from './components/Products/Products'
import NavBar from './components/NavBar/NavBar'
import Cart from './components/Cart/Cart'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import {commerce} from './lib/commerce'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchProducts = async () => {
        const {data} = await commerce.products.list()
        setProducts(data)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddtoCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)
        setCart(item.cart)
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
                    <Route exact path="/" element={<Products products={products} onAddToCart={handleAddtoCart}/>}/>
                    <Route exact path="/cart" element={<Cart cart={cart}/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App