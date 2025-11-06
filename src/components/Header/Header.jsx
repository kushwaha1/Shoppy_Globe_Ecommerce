import { Contact, Home, List, ShoppingCart, Menu, X, ShoppingBasketIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { selectCartCount } from '../../utils/cartSlice'
import { useSelector } from "react-redux";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const cartCount = useSelector(selectCartCount); // derived count from store
    const cartRef = useRef();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <header className='w-full bg-gradient-to-r from-[#00073f] via-[#0a1a4f] to-[#00073f] shadow-2xl sticky top-0 z-50 backdrop-blur-lg border-b border-[#BFA6A0]/20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Main Header */}
                <div className='flex justify-between items-center h-16 sm:h-20'>
                    {/* Logo Section */}
                    <Link to="/" className='flex gap-3 items-center group'>
                        <div className='relative'>
                            <div className='w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-[#BFA6A0] to-[#D4BEB8] rounded-2xl flex items-center justify-center text-[#00073f] font-black text-lg sm:text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xl'>
                                SG
                            </div>
                            <div className='absolute inset-0 bg-[#BFA6A0] rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-all duration-300'></div>
                        </div>
                        <div>
                            <h1 className='text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-none'>
                                ShoppyGlobe
                            </h1>
                        </div>
                    </Link>

                    {/* Right Section - Icons */}
                    <div className='flex items-center gap-2 sm:gap-3'>
                        {/* Desktop Navigation */}
                        <nav className='hidden lg:flex items-center gap-4'>
                            <Link
                                to="/"
                                className={`flex gap-2 items-center px-5 py-2.5 rounded-full transition-all duration-300 ${currentPath === '/'
                                        ? 'bg-[#BFA6A0] text-[#00073f] scale-105 shadow-lg'
                                        : 'text-white hover:bg-[#BFA6A0]/20 hover:text-[#BFA6A0]'
                                    }`}
                            >
                                <Home className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
                                <span className='font-semibold'>Home</span>
                            </Link>
                            <Link
                                to="/products"
                                className={`flex gap-2 items-center px-5 py-2.5 rounded-full transition-all duration-300 ${currentPath === '/products'
                                        ? 'bg-[#BFA6A0] text-[#00073f] scale-105 shadow-lg'
                                        : 'text-white hover:bg-[#BFA6A0]/20 hover:text-[#BFA6A0]'
                                    }`}
                            >
                                <List className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
                                <span className='font-semibold'>Products</span>
                            </Link>
                            <Link
                                to="/checkout"
                                className={`flex gap-2 items-center px-5 py-2.5 rounded-full transition-all duration-300 ${currentPath === '/checkout'
                                        ? 'bg-[#BFA6A0] text-[#00073f] scale-105 shadow-lg'
                                        : 'text-white hover:bg-[#BFA6A0]/20 hover:text-[#BFA6A0]'
                                    }`}
                            >
                                <ShoppingBasketIcon className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
                                <span className='font-semibold'>Checkout</span>
                            </Link>
                        </nav>

                        <Link
                            to="/cart"
                            ref={cartRef}
                            className={`relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 group shadow-lg hover:shadow-[#BFA6A0]/50 ${currentPath === '/cart'
                                    ? 'bg-gradient-to-br from-[#BFA6A0] to-[#D4BEB8] text-[#00073f] scale-105 shadow-2xl ring-2 ring-[#BFA6A0]'
                                    : 'text-white hover:scale-110 border-2 border-[#BFA6A0] shadow-[#BFA6A0]/50'
                                }`}
                            aria-label="Shopping Cart"
                        >
                            <ShoppingCart className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
                            {cartCount >= 0 && (
                                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg border-2 border-[#00073f]'>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 hover:bg-[#BFA6A0]/20 text-white transition-all duration-300 border border-white/10'
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                <nav className='px-4 py-5 bg-[#00073f]/95 backdrop-blur-lg border-t border-[#BFA6A0]/20'>
                    <div className='space-y-2'>
                        <Link
                            to="/"
                            className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 border border-white/10 ${
                                currentPath === '/'
                                    ? 'bg-[#BFA6A0] text-[#00073f] shadow-lg'
                                    : 'bg-white/5 text-white hover:bg-[#BFA6A0]/20 hover:text-[#BFA6A0] hover:border-[#BFA6A0]/30'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Home className='w-5 h-5' />
                            <span className='font-semibold'>Home</span>
                        </Link>
                        <Link
                            to="/products"
                            className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 border border-white/10 ${currentPath === '/products'
                                    ? 'bg-[#BFA6A0] text-[#00073f] shadow-lg'
                                    : 'bg-white/5 text-white hover:bg-[#BFA6A0]/20 hover:text-[#BFA6A0] hover:border-[#BFA6A0]/30'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <List className='w-5 h-5' />
                            <span className='font-semibold'>Products</span>
                        </Link>
                        <Link
                            to="/checkout"
                            className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 border border-white/10 ${currentPath === '/checkout'
                                    ? 'bg-[#BFA6A0] text-[#00073f] shadow-lg'
                                    : 'bg-white/5 text-white hover:bg-[#BFA6A0]/20 hover:text-[#BFA6A0] hover:border-[#BFA6A0]/30'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Contact className='w-5 h-5' />
                            <span className='font-semibold'>Checkout</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header