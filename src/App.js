import React, { useState, useEffect } from 'react'
import Products from './components/Products/Products'
import NavBar from './components/NavBar/NavBar'
import {commerce} from './lib/commerce'

const App = () => {
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const {data} = await commerce.products.list()
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <NavBar/>
            <Products products={products}/>
        </>
    )
}

export default App