'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Award, BookOpen, Users, Target } from 'lucide-react';

const ProfileSekolah = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-20 bg-school-light" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-school-primary mb-4">
            Profil Sekolah
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            SMK 2 Batusangkar adalah Sekolah Menengah Kejuruan unggulan yang fokus pada 
            pengembangan kompetensi siswa melalui pendekatan praktis dan inovatif.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-school-primary mb-6">
                Tentang Kami
              </h3>
              <p className="text-gray-600 mb-6">
                Didirikan pada tahun 1985, SMK 2 Batusangkar telah menjadi pusat unggulan 
                dalam pendidikan kejuruan di Sumatera Barat. Kami berkomitmen untuk 
                mengembangkan kompetensi siswa melalui pembelajaran praktis yang relevan 
                dengan kebutuhan industri.
              </p>
              <p className="text-gray-600 mb-6">
                Program Teaching Factory (TEFA) kami menjadi model unggulan yang 
                menggabungkan pembelajaran di kelas dengan pengalaman produksi nyata, 
                mempersiapkan siswa untuk siap bekerja dan berwirausaha.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Award className="h-8 w-8 text-school-accent mr-2" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Akreditasi A</h4>
                    <p className="text-sm text-gray-600">Standar mutu terbaik</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BookOpen className="h-8 w-8 text-school-accent mr-2" />
                  <div>
                    <h4 className="font-semibold text-gray-800">5 Program Keahlian</h4>
                    <p className="text-sm text-gray-600">Kurikulum terintegrasi</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-8 w-8 text-school-accent mr-2" />
                  <div>
                    <h4 className="font-semibold text-gray-800">50+ Guru Ahli</h4>
                    <p className="text-sm text-gray-600">Pendidik berpengalaman</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Target className="h-8 w-8 text-school-accent mr-2" />
                  <div>
                    <h4 className="font-semibold text-gray-800">85% Tersalurkan</h4>
                    <p className="text-sm text-gray-600">Tingkat keterserapan lulusan</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="relative h-72 w-72 md:h-80 md:w-80 mb-6 rounded-full overflow-hidden border-4 border-school-primary shadow-xl">
              <Image 
                src="/image/kepsek.jpg" 
                alt="Kepala Sekolah SMK 2 Batusangkar"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-school-primary">Budi Dharmawan M.Pd</h3>
            <p className="text-gray-600">Kepala Sekolah</p>
            <p className="mt-4 text-center text-gray-600 max-w-md">
              "Sesuai amanat Undang-Undang (UU) Nomor: 14 Tahun 2008 tentang Keterbukaan Informasi Publik (KIP), SMKN 2 Batusangkar sebagai badan publik berupaya memenuhi kebutuhan publik akan informasi dengan membuat laman ppid.smkn2batusangkar.sch.id Layanan Informasi Publik SMKN 2 Batusangkar disediakan untuk memudahkan publik mendapatkan informasi tentang SMKN 2 Batusangkar. Publik berhak mengajukan informasi publik yang dikelola oleh SMKN 2 Batusangkar sesuai ketentuan-ketentuan yang berlaku. SMKN 2 Batusangkar melayani seluruh permohonan informasi melalui Layanan Informasi Publik secara daring maupun luring.SMKN 2 Batusangkar juga menyediakan berbagai informasi publik, yang dapat diakses dari laman website ppid.smkn2batusangkar.sch.id maupun website ppid.smkn2batusangkar.sch.id"
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSekolah;