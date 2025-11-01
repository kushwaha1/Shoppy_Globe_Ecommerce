import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import App from './App'
import ProductList from './components/ProductList/ProductList'

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
            }
        ]
    }
])

export default router