'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/LanguageSelector';
import Image from 'next/image';

export default function Navigation() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if current page should have scrolled styles by default
  const shouldHaveScrolledStyles = pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we should show scrolled styles
  const showScrolledStyles = scrolled || shouldHaveScrolledStyles;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Navigation - Improved with dynamic styling */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        showScrolledStyles ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/10 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image src="/logo.png" alt="LogBid" width={28} height={28}  className="mr-2"/>
                <span className={`text-2xl font-black transition-colors ${
                  showScrolledStyles ? 'text-gray-900' : 'text-white'
                }`}>LogBid</span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/servicios" className={`font-medium transition-colors duration-200 ${
                showScrolledStyles ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}>
                {t('nav.services')}
              </Link>
              <Link href="/como-funciona" className={`font-medium transition-colors duration-200 ${
                showScrolledStyles ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}>
                {t('nav.howItWorks')}
              </Link>
              <Link href="/precios" className={`font-medium transition-colors duration-200 ${
                showScrolledStyles ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}>
                {t('nav.pricing')}
              </Link>
              <Link href="/soporte" className={`font-medium transition-colors duration-200 ${
                showScrolledStyles ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}>
                {t('nav.support')}
              </Link>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <LanguageSelector />
                </div>
                
                <Button className={`px-6 py-2 rounded-md font-medium transition-all ${
                  showScrolledStyles ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white hover:bg-gray-100 text-blue-900'
                }`} onClick={() => window.location.href = 'https://app.logbid.co/auth'}>
                    {t('nav.login')}
                  </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <Button
                size="sm"
                className={showScrolledStyles ? 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-base font-medium rounded-md mr-2' : 'bg-white hover:bg-gray-100 text-blue-900 px-4 py-2 text-base font-medium rounded-md mr-2'}
                onClick={() => { setIsMenuOpen(false); window.location.href = 'https://app.logbid.co/auth'; }}
              >
                {t('nav.login')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={showScrolledStyles ? 'p-3 bg-gray-100 hover:bg-gray-200 rounded-md' : 'p-3 bg-white/20 hover:bg-white/30 rounded-md'}
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute left-0 top-1 block h-0.5 w-6 origin-center transition-all duration-300 ease-in-out ${showScrolledStyles ? 'bg-gray-700' : 'bg-white'} ${isMenuOpen ? 'top-1/2 rotate-45' : ''}`}></span>
                  <span className={`absolute left-0 top-1/2 block h-0.5 w-6 origin-center transition-all duration-300 ease-in-out ${showScrolledStyles ? 'bg-gray-700' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`absolute left-0 bottom-1 block h-0.5 w-6 origin-center transition-all duration-300 ease-in-out ${showScrolledStyles ? 'bg-gray-700' : 'bg-white'} ${isMenuOpen ? 'top-1/2 -rotate-45' : ''}`}></span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Fullscreen Overlay */}
      <div className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-full bg-blue-900 shadow-2xl sm:rounded-2xl sm:inset-y-0 sm:my-4 sm:mr-4 sm:h-[calc(100%-2rem)] sm:w-[420px] transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          
          {/* Close Button */}
          <div className="flex justify-between items-center p-6 border-b border-blue-700">
            <span className="text-2xl font-black text-white">LogBid</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-blue-800 rounded-md"
            >
              <X className="w-6 h-6 text-white" />
            </Button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="p-6">
            <div className="pt-6 border-b border-blue-700 flex justify-between items-center">
              <small className="text-white font-medium text-md mb-6 text-center">{t('form.language')}</small>
              <div className="flex items-center space-x-3 mb-6">
                <LanguageSelector />
              </div>
            </div>
            <div className="space-y-0">
              <Link href="/servicios" className="block text-white hover:text-blue-200 font-medium text-lg transition-colors duration-200 py-4 border-b border-blue-700" onClick={() => setIsMenuOpen(false)}>
                {t('nav.services')}
              </Link>
              <Link href="/como-funciona" className="block text-white hover:text-blue-200 font-medium text-lg transition-colors duration-200 py-4 border-b border-blue-700" onClick={() => setIsMenuOpen(false)}>
                {t('nav.howItWorks')}
              </Link>
              <Link href="/precios" className="block text-white hover:text-blue-200 font-medium text-lg transition-colors duration-200 py-4 border-b border-blue-700" onClick={() => setIsMenuOpen(false)}>
                {t('nav.pricing')}
              </Link>
              <Link href="/soporte" className="block text-white hover:text-blue-200 font-medium text-lg transition-colors duration-200 py-4 " onClick={() => setIsMenuOpen(false)}>
                {t('nav.support')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
