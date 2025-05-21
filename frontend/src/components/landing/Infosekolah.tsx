'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, BookOpen, Users, Calendar } from 'lucide-react';

const infosekolah = [
  {
    title: 'Visi Kami',
    description: 'Mewujudkan SMK unggul yang menghasilkan lulusan berkarakter, profesional, dan berdaya saing global.',
    icon: <Award className="h-8 w-8 text-school-accent" />,
  },
  {
    title: 'Prestasi Kami',
    description: 'Meraih berbagai penghargaan tingkat nasional dalam kompetisi keterampilan dan inovasi pembelajaran.',
    icon: <Award className="h-8 w-8 text-school-accent" />,
  },
  {
    title: 'Program Unggulan',
    description: 'Teaching Factory (TEFA) dengan fokus pada hidroponik, peternakan, dan pengembangan kewirausahaan.',
    icon: <BookOpen className="h-8 w-8 text-school-accent" />,
  },
  {
    title: 'Tenaga Pengajar',
    description: 'Didukung oleh guru profesional bersertifikasi dan praktisi industri yang berpengalaman.',
    icon: <Users className="h-8 w-8 text-school-accent" />,
  },
  {
    title: 'Kegiatan Tahunan',
    description: 'Expo TEFA, pameran produk hidroponik, dan pelatihan kewirausahaan bagi siswa dan masyarakat.',
    icon: <Calendar className="h-8 w-8 text-school-accent" />,
  },
];

const InfoSekolah = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="info" className="py-20 bg-school-light">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-school-primary mb-4">
            Informasi Sekolah
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mengenal lebih dekat dengan SMK 2 Batusangkar dan komitmen kami untuk 
            mengembangkan pendidikan vokasi berkualitas tinggi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infosekolah.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-school-primary/10 rounded-full">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-school-primary mb-3 text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSekolah;