'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    title: 'Melon Hidroponik',
    description: 'Produksi melon premium dengan teknologi hidroponik modern',
    stats: 'Produksi 500kg/bulan',
    image: 'https://images.pexels.com/photos/2894272/pexels-photo-2894272.jpeg',
  },
  {
    title: 'Peternakan Ayam',
    description: 'Peternakan ayam modern dengan standar kualitas tinggi',
    stats: 'Kapasitas 5000 ekor',
    image: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg',
  },
  {
    title: 'Sayuran Hidroponik',
    description: 'Budidaya sayuran segar bebas pestisida',
    stats: 'Produksi harian',
    image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg',
  },
];

const TefaSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-school-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-school-primary via-school-primary/90 to-school-primary/80 z-10" />
      
      <div className="relative z-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <div className="flex-1 px-4 md:px-8">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col md:flex-row items-center gap-6"
              >
                <div className="relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={slides[current].image}
                    alt={slides[current].title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                <div className="text-center md:text-left md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {slides[current].title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/90 mb-2">
                    {slides[current].description}
                  </p>
                  <p className="text-base md:text-lg text-white/80 font-semibold">
                    {slides[current].stats}
                  </p>
                </div>
              </motion.div>
            </div>

            <button
              onClick={handleNext}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrent(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slides[current].image}
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
    </div>
  );
};

export default TefaSlider;