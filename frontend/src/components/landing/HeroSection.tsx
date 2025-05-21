'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-hero-pattern bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-school-primary/80"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.6 }}
        >
          SMK 2 Batusangkar
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-8">
            Pusat Keunggulan Teaching Factory (TEFA)
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Mengembangkan inovasi pembelajaran berbasis teaching factory dengan fokus
            pada budidaya melon hidroponik, peternakan ayam, dan tanaman sayuran hidroponik.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="#tefa" 
            className="bg-school-accent hover:bg-school-accent/80 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
          >
            Lihat Program TEFA
          </a>
          <a 
            href="#about" 
            className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
          >
            Tentang Kami
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <a href="#info" aria-label="Scroll down">
          <ArrowDownCircle className="h-10 w-10" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;