import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Heart, ArrowRight, Send } from 'lucide-react';
import "./Footer.css"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#00073f] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#BFA6A0] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#BFA6A0] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#BFA6A0] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#BFA6A0] to-transparent"></div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-6 animate-fadeInUp">
            <div>
              <h3 className="text-2xl font-bold text-[#BFA6A0] mb-2">
                ShoppyGlobe
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Premium quality products delivered with passion. Your satisfaction is our priority.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, link: 'https://www.facebook.com/' },
                { Icon: Instagram, link: 'https://www.instagram.com/' },
                { Icon: Twitter, link: 'https://x.com/' },
                { Icon: Linkedin, link: 'https://www.linkedin.com/' }
              ].map(({ Icon, link }, index) => (
                <Link
                  key={index}
                  to={link}
                  target='_blank'
                  className="group relative w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-[#BFA6A0]/20 flex items-center justify-center hover:bg-[#BFA6A0] hover:border-[#BFA6A0] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <Icon className="w-4 h-4 text-white/80 group-hover:text-[#00073f] transition-colors" />
                  <div className="absolute inset-0 rounded-full bg-[#BFA6A0]/20 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-lg font-semibold text-[#BFA6A0] flex items-center gap-2">
              Quick Links
              <div className="h-px flex-1 bg-gradient-to-r from-[#BFA6A0]/30 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'Cart', path: '/cart' },
                { name: 'Checkout', path: '/checkout' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="group text-white/70 hover:text-[#BFA6A0] text-sm flex items-center gap-2 transition-all duration-300 hover:translate-x-2"
                  >
                    <ArrowRight className="w-4 h-4 text-[#BFA6A0] opacity-0 group-hover:opacity-100 transition-opacity -ml-6 group-hover:ml-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-semibold text-[#BFA6A0] flex items-center gap-2">
              Support
              <div className="h-px flex-1 bg-gradient-to-r from-[#BFA6A0]/30 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Help Center', path: '#' },
                { name: 'Shipping Info', path: '#' },
                { name: 'Returns', path: '#' },
                { name: 'Privacy Policy', path: '#' },
                { name: 'Terms & Conditions', path: '#' }
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="group text-white/70 hover:text-[#BFA6A0] text-sm flex items-center gap-2 transition-all duration-300 hover:translate-x-2"
                  >
                    <ArrowRight className="w-4 h-4 text-[#BFA6A0] opacity-0 group-hover:opacity-100 transition-opacity -ml-6 group-hover:ml-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div>
              <h4 className="text-lg font-semibold text-[#BFA6A0] flex items-center gap-2 mb-4">
                Contact Us
                <div className="h-px flex-1 bg-gradient-to-r from-[#BFA6A0]/30 to-transparent"></div>
              </h4>
              <div className="space-y-3">
                <Link to="tel:+917982077624" className="flex items-start gap-3 text-white/70 hover:text-[#BFA6A0] text-sm transition-colors group">
                  <Phone className="w-4 h-4 mt-0.5 text-[#BFA6A0] group-hover:scale-110 transition-transform" />
                  <span>+91 (7982) 077-624</span>
                </Link>
                <Link to="mailto:info@shoppyglobe.com" className="flex items-start gap-3 text-white/70 hover:text-[#BFA6A0] text-sm transition-colors group">
                  <Mail className="w-4 h-4 mt-0.5 text-[#BFA6A0] group-hover:scale-110 transition-transform" />
                  <span>info@shoppyglobe.com</span>
                </Link>
                <div className="flex items-start gap-3 text-white/70 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#BFA6A0]" />
                  <span>123 ShoppyGlobe Business Street</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative pt-8 border-t border-[#BFA6A0]/20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-white/60">
            <p className="flex items-center gap-2 animate-fadeIn">
              © {currentYear} Sweety ShoppyGlobe. Made with 
              <Heart className="w-4 h-4 text-[#BFA6A0] animate-heartBeat" fill="currentColor" /> 
              All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}