'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Cpu, BookOpen, Database, Wrench, ShoppingBag } from 'lucide-react';

const jurusan = [
  {
    name: 'Teknik Komputer dan Jaringan',
    description: 'Fokus pada pengembangan keterampilan di bidang perakitan, instalasi, dan pemeliharaan komputer serta jaringan.',
    icon: <Cpu className="h-12 w-12 text-white" />,
    color: 'bg-blue-600',
  },
  {
    name: 'Agribisnis Pengolahan Hasil Pertanian',
    description: 'Program keahlian yang mempersiapkan siswa untuk mampu mengolah hasil pertanian menjadi produk bernilai tambah.',
    icon: <BookOpen className="h-12 w-12 text-white" />,
    color: 'bg-green-600',
  },
  {
    name: 'Rekayasa Perangkat Lunak',
    description: 'Membekali siswa dengan keterampilan membangun dan mengembangkan aplikasi perangkat lunak.',
    icon: <Database className="h-12 w-12 text-white" />,
    color: 'bg-purple-600',
  },
  {
    name: 'Teknik dan Bisnis Sepeda Motor',
    description: 'Mempersiapkan siswa untuk menguasai perawatan, perbaikan, dan pengelolaan bisnis sepeda motor.',
    icon: <Wrench className="h-12 w-12 text-white" />,
    color: 'bg-red-600',
  },
  {
    name: 'Bisnis Daring dan Pemasaran',
    description: 'Fokus pada pengembangan keterampilan pemasaran dan perdagangan dengan memanfaatkan teknologi digital.',
    icon: <ShoppingBag className="h-12 w-12 text-white" />,
    color: 'bg-amber-600',
  },
];

const Jurusans = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="jurusan" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-school-primary mb-4">
            Program Keahlian
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            SMK 2 Batusangkar menawarkan berbagai program keahlian yang dirancang 
            untuk mempersiapkan siswa dengan keterampilan yang relevan dengan kebutuhan industri.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {jurusan.map((dept, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className={`${dept.color} p-6 flex justify-center`}>
                <div className="rounded-full p-4 bg-white/20">
                  {dept.icon}
                </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {dept.name}
                </h3>
                <p className="text-gray-600">
                  {dept.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Jurusans;