'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const mitra = [
  {
    name: 'Dinas Pertanian Kabupaten Tanah Datar',
    logo: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg',
  },
  {
    name: 'Pemerintah Provinsi Sumatera Barat',
    logo: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg',
  },
  {
    name: 'Kementerian Pendidikan dan Kebudayaan',
    logo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    name: 'PT Agro Nusantara',
    logo: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg',
  },
  {
    name: 'Asosiasi Petani Hidroponik Indonesia',
    logo: 'https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg',
  },
  {
    name: 'Universitas Andalas',
    logo: 'https://images.pexels.com/photos/7541586/pexels-photo-7541586.jpeg',
  },
];

const Mitras = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="mitra" className="py-20 bg-school-light" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-school-primary mb-4">
            Mitra Kerja Sama
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Kami berkolaborasi dengan berbagai institusi dan perusahaan untuk 
            memastikan program TEFA kami relevan dan berkualitas tinggi.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {mitra.map((mitra, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 relative bg-white rounded-full p-2 shadow-md mb-4 overflow-hidden">
                <Image 
                  src={mitra.logo} 
                  alt={mitra.name}
                  fill 
                  className="object-cover rounded-full"
                />
              </div>
              <p className="text-center text-sm text-gray-700 font-medium">
                {mitra.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Mitras;