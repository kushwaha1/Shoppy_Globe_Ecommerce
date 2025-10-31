import React, { useState } from 'react'
import { Sparkles, Flower2, Armchair, ShoppingBasket, ArrowRight, Star } from 'lucide-react'
import ProductList from '../../components/ProductList/ProductList'

const heroImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
const makeup = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop"
const fragrance = "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop"
const furniture = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop"
const grocery = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop"



function Home() {
    const [hoveredCard, setHoveredCard] = useState(null)
    const categories = [
        { id: 1, name: 'Beauty', icon: Sparkles, image: makeup, color: '#FF6B9D' },
        { id: 2, name: 'Fragrances', icon: Flower2, image: fragrance, color: '#C084FC' },
        { id: 3, name: 'Furniture', icon: Armchair, image: furniture, color: '#60A5FA' },
        { id: 4, name: 'Groceries', icon: ShoppingBasket, image: grocery, color: '#34D399' }
    ]

    const featuredProducts = [
        { id: 1, title: 'Hydrating Glow Serum', category: 'Beauty', price: 24.99, rating: 4.8, img: makeup },
        { id: 2, title: 'Blossom Eau de Parfum', category: 'Fragrances', price: 79.0, rating: 4.9, img: fragrance },
        { id: 3, title: 'Soft Linen Sofa', category: 'Furniture', price: 499.0, rating: 4.6, img: furniture },
        { id: 4, title: 'Organic Almonds (500g)', category: 'Groceries', price: 12.5, rating: 4.7, img: grocery },
    ]


    return (
        <div className='min-h-screen relative overflow-hidden'>
            {/* Background Image with Overlay */}
            <div className="fixed inset-0 z-0">
                <img
                    src={heroImage}
                    alt="Shopping"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#00073f]/90 via-[#00073f]/70 to-[#1a1a5f]/80"></div>

                {/* Animated Circles */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#BFA6A0]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#BFA6A0]/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <section className='relative w-full min-h-screen flex items-center overflow-hidden'>
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-[#BFA6A0] rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#BFA6A0] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left: Content */}
                        <div className="space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-[#BFA6A0]/20 backdrop-blur-sm px-6 py-3 rounded-full border border-[#BFA6A0]/30">
                                <Sparkles className="w-5 h-5 text-[#BFA6A0]" />
                                <span className="text-[#BFA6A0] font-semibold">Premium Shopping Experience</span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                                Discover Your
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#BFA6A0] to-[#D4BEB8]">
                                    Perfect Style
                                </span>
                            </h1>

                            <p className="text-xl text-white/80 max-w-lg mx-auto lg:mx-0">
                                Explore our curated collection of beauty, fragrances, furniture, and fresh groceries. Quality meets convenience.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="group bg-gradient-to-r from-[#BFA6A0] to-[#D4BEB8] text-[#00073f] font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-[#BFA6A0]/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                    Start Shopping
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
                                    View Collections
                                </button>
                            </div>
                        </div>

                        {/* Right: Floating Cards */}
                        <div className="relative h-[510px] hidden lg:block">
                            {categories.map((cat, idx) => {
                                const Icon = cat.icon
                                const positions = [
                                    { top: '0%', left: '0%', rotate: '-5deg' },
                                    { top: '5%', right: '0%', rotate: '5deg' },
                                    { bottom: '20%', left: '5%', rotate: '3deg' },
                                    { bottom: '15%', right: '10%', rotate: '-3deg' }
                                ]
                                return (
                                    <div
                                        key={cat.id}
                                        className={`absolute w-64 h-80 bg-white rounded-3xl shadow-2xl cursor-pointer transition-all duration-500 hover:scale-110 hover:z-50`}
                                        style={{
                                            ...positions[idx],
                                            transform: hoveredCard === cat.id ? 'scale(1.1) rotate(0deg)' : `rotate(${positions[idx].rotate})`,
                                            animation: `float ${3 + idx * 0.5}s ease-in-out infinite`
                                        }}
                                        onMouseEnter={() => setHoveredCard(cat.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="w-full h-48 object-cover rounded-t-3xl"
                                        />
                                        <div className="p-6 space-y-3">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: cat.color + '20'}}>
                                                <Icon className="w-6 h-6" style={{color: cat.color}} />
                                            </div>
                                            <h3 className="text-xl font-bold text-[#00073f]">{cat.name}</h3>
                                            <p className="text-sm text-gray-600">Explore collection →</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(var(--rotate)); }
                        50% { transform: translateY(-20px) rotate(var(--rotate)); }
                    }
                `}</style>
            </section>

            {/* Main Content */}
            <section className='relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10'>
                <div className="max-w-5xl w-full">
                    {/* Glassmorphism Card */}
                    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 border border-white/20 shadow-2xl">

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                            Your One-Stop
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#BFA6A0] to-[#D4BEB8] mt-2">
                                Shopping Destination
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl">
                            Discover premium products across beauty, fragrances, furniture, and fresh groceries.
                            Quality you can trust, delivered with care.
                        </p>

                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-4">
                            {categories.map((cat) => {
                                const Icon = cat.icon
                                return (
                                    <div
                                        key={cat.id}
                                        className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-[#BFA6A0]/50 rounded-2xl px-6 py-4 transition-all duration-300 cursor-pointer flex items-center gap-3"
                                    >
                                        <div className="w-10 h-10 bg-[#BFA6A0]/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Icon className="w-5 h-5 text-[#BFA6A0]" />
                                        </div>
                                        <span className="text-white font-semibold">{cat.name}</span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/20">
                            {[
                                { value: '50K+', label: 'Products' },
                                { value: '100K+', label: 'Customers' },
                                { value: '4.9★', label: 'Rating' }
                            ].map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-3xl sm:text-4xl font-bold text-[#BFA6A0]">{stat.value}</div>
                                    <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="hidden lg:block">
                        <div className="absolute -right-20 top-20 w-40 h-40 bg-[#BFA6A0]/20 backdrop-blur-xl rounded-3xl rotate-12 animate-pulse"></div>
                        <div className="absolute -left-20 bottom-20 w-32 h-32 bg-[#BFA6A0]/20 backdrop-blur-xl rounded-3xl -rotate-12 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>

                </div>
            </section>


            {/* === Other sections === */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                    <ProductList products={featuredProducts} />
            </section>

            {/* Bottom Features */}
            <section className="relative z-10 py-20 bg-gradient-to-t from-[#00073f]/50 to-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: '🚚', title: 'Free Delivery', desc: 'On orders above $50' },
                            { icon: '💳', title: 'Secure Payment', desc: '100% safe transactions' },
                            { icon: '🎁', title: 'Best Offers', desc: 'Exclusive deals daily' }
                        ].map((item, idx) => (
                            <div key={idx} className="text-center p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                <div className="text-5xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-white/60">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home