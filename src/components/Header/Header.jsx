import { Contact, Home, List, ShoppingCart, Search, User, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const cartCount = 3 // Example cart count

    return (
        <header className='w-full bg-white shadow-md sticky top-0 z-50 transition-all duration-300'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Main Header */}
                <div className='flex justify-between items-center h-16 sm:h-20'>
                    {/* Logo Section */}
                    <Link to="/" className='flex gap-2 items-center group'>
                        <div className='relative'>
                            <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110 shadow-lg'>
                                SG
                            </div>
                            <div className='absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300'></div>
                        </div>
                        <h1 className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                            ShoppyGlobe
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className='hidden lg:flex items-center gap-8'>
                        <Link to="/" className='flex gap-2 items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 group'>
                            <Home className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
                            <span className='font-medium'>Home</span>
                        </Link>
                       <Link to="/products" className='flex gap-2 items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 group'>
                            <List className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
                            <span className='font-medium'>Products</span>
                        </Link>
                       <Link to="/contact" className='flex gap-2 items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 group'>
                            <Contact className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
                            <span className='font-medium'>Contact</span>
                        </Link>
                    </nav>

                    {/* Right Section - Icons */}
                    <div className='flex items-center gap-3 sm:gap-4'>
                        {/* Search Button - Desktop */}
                        <button 
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className='hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-all duration-200'
                            aria-label="Search"
                        >
                            <Search className='w-5 h-5' />
                        </button>

                        {/* Login Button */}
                        <Link 
                            to="/login"
                            className='hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-all duration-200'
                            aria-label="Login"
                        >
                            <User className='w-5 h-5' />
                        </Link>

                        {/* Cart Button */}
                        <Link 
                            to="/cart"
                            className='relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition-all duration-200 group'
                            aria-label="Shopping Cart"
                        >
                            <ShoppingCart className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
                            {cartCount > 0 && (
                                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse'>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700 transition-all duration-200'
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                        </button>
                    </div>
                </div>

                {/* Search Bar - Desktop */}
                <div className={`hidden sm:block overflow-hidden transition-all duration-300 ${isSearchOpen ? 'max-h-20 pb-4' : 'max-h-0'}`}>
                    <div className='relative'>
                        <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                        <input 
                            type="text"
                            placeholder="Search for products..."
                            className='w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200'
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
                <nav className='px-4 py-4 bg-gray-50 border-t border-gray-200'>
                    {/* Mobile Search */}
                    <div className='mb-4 sm:hidden'>
                        <div className='relative'>
                            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                            <input 
                                type="text"
                                placeholder="Search products..."
                                className='w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200'
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <Link 
                            to="/" 
                            className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white text-gray-700 hover:text-blue-600 transition-all duration-200'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Home className='w-5 h-5' />
                            <span className='font-medium'>Home</span>
                        </Link>
                        <Link 
                            to="/products" 
                            className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white text-gray-700 hover:text-blue-600 transition-all duration-200'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <List className='w-5 h-5' />
                            <span className='font-medium'>Products</span>
                        </Link>
                        <Link 
                            to="/contact" 
                            className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white text-gray-700 hover:text-blue-600 transition-all duration-200'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Contact className='w-5 h-5' />
                            <span className='font-medium'>Contact</span>
                        </Link>
                        <Link 
                            to="/login" 
                            className='sm:hidden flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white text-gray-700 hover:text-blue-600 transition-all duration-200'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <User className='w-5 h-5' />
                            <span className='font-medium'>Login</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header