import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import App from './App'
import ProductList from './components/ProductList/ProductList'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'
import NotFound from './pages/NotFound/NotFound'
import Checkout from './components/Checkout/Checkout'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/products",
                element: <ProductList />
            },
            {
                path: "/products/:id",
                element: <ProductDetail />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "checkout",
                element: <Checkout />
            }
        ],
        errorElement: <NotFound />
    },
])

export default router