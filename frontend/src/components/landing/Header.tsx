'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-12">
              <div className="absolute bg-school-primary rounded-full h-12 w-12 flex items-center justify-center text-white font-bold">
                SMK2
              </div>
            </div>
            <div className={`font-semibold text-lg ${isScrolled ? 'text-school-primary' : 'text-white'}`}>
              SMK 2 Batusangkar
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { name: 'Beranda', href: '#' },
              { name: 'Tentang', href: '#about' },
              { name: 'TEFA', href: '#tefa' },
              { name: 'Jurusan', href: '#jurusan' },
              { name: 'Mitra', href: '#mitra' },
              { name: 'Kontak', href: '#kontak' },
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`font-medium hover:text-school-accent transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg mt-2 rounded-lg">
            <div className="py-3 space-y-1">
              {[
                { name: 'Beranda', href: '#' },
                { name: 'Tentang', href: '#about' },
                { name: 'TEFA', href: '#tefa' },
                { name: 'Jurusan', href: '#jurusan' },
                { name: 'Mitra', href: '#mitra' },
                { name: 'Kontak', href: '#kontak' },
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-school-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;