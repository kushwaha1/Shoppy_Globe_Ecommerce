import React, { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import { Loader2 } from 'lucide-react'

const App = lazy(() => import('./App'));
const Home = lazy(() => import('./pages/Home/Home'));
const ProductList = lazy(() => import('./components/ProductList/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Checkout = lazy(() => import('./components/Checkout/Checkout'));

// Loading component
const PageLoader = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading...</p>
        </div>
    </div>
);

// Wrapper component with Suspense
const SuspenseWrapper = ({ children }) => (
    <Suspense fallback={<PageLoader />}>
        {children}
    </Suspense>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <SuspenseWrapper>
                <App />
            </SuspenseWrapper>
        ),
        children: [
            {
                path: "/",
                element: (
                    <SuspenseWrapper>
                        <Home />
                    </SuspenseWrapper>
                ),
            },
            {
                path: "/products",
                element: (
                    <SuspenseWrapper>
                        <ProductList />
                    </SuspenseWrapper>
                )
            },
            {
                path: "/products/:id",
                element: (
                    <SuspenseWrapper>
                        <ProductDetail />
                    </SuspenseWrapper>
                )
            },
            {
                path: "cart",
                element: (
                    <SuspenseWrapper>
                        <Cart />
                    </SuspenseWrapper>
                )
            },
            {
                path: "checkout",
                element: (
                    <SuspenseWrapper>
                        <Checkout />
                    </SuspenseWrapper>
                )
            }
        ],
        errorElement: <NotFound />
    },
])

export default router