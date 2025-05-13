'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const programs = [
  {
    title: 'Melon Hidroponik',
    description: 'Program unggulan kami mengembangkan budidaya melon hidroponik dengan teknologi modern, menghasilkan buah berkualitas tinggi dan ramah lingkungan.',
    image: 'https://images.pexels.com/photos/2894272/pexels-photo-2894272.jpeg',
    features: ['Sistem Hidroponik NFT', 'Kontrol Kualitas Ketat', 'Hasil Panen Premium', 'Pemasaran Modern'],
  },
  {
    title: 'Peternakan Ayam',
    description: 'Menerapkan sistem peternakan ayam modern dengan standar kesehatan dan nutrisi terbaik, fokus pada produksi ayam pedaging dan petelur.',
    image: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg',
    features: ['Kandang Modern', 'Nutrisi Terukur', 'Pemantauan Kesehatan', 'Produksi Berkelanjutan'],
  },
  {
    title: 'Sayuran Hidroponik',
    description: 'Budidaya berbagai jenis sayuran segar dengan sistem hidroponik yang memastikan hasil panen bebas pestisida dan kaya nutrisi.',
    image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg',
    features: ['Aneka Sayuran Segar', 'Bebas Pestisida', 'Siklus Panen Cepat', 'Pertanian Vertikal'],
  },
];

const TefaPrograms = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="tefa" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-school-primary mb-4">
            Program Teaching Factory (TEFA)
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Kami mengembangkan program TEFA yang memadukan pembelajaran berbasis 
            produksi dengan teknologi modern untuk menghasilkan produk berkualitas.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {programs.map((program, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-64 relative">
                <Image 
                  src={program.image} 
                  alt={program.title}
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-school-primary mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {program.description}
                </p>
                <ul className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-school-accent mr-2"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TefaPrograms;