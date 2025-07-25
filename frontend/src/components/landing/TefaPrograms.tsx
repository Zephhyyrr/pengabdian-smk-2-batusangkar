'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

// Define TypeScript interfaces for melon data structure
export interface MelonDetails {
  brix: string;
  visual: string[];
  bentuk: string;
  tekstur: string[];
  keunggulan: string[];
}

export interface MelonProgram {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  department: string;
  details: MelonDetails;
  harvestTime: string;
  idealStorage: string;
  isNew?: boolean;
}

// Gambar melon untuk digunakan
const melonImages = {
  greenigal: '/image/melongreennigal.png',
  dalmatian: '/image/melondalmatian.png',
  greeniesweet: '/image/melongreeniesweet.png',
  aruni: '/image/melonaruni.png',
  elysia: '/image/melonelysia.png',
  midori: '/image/melonmidori.png',
  sunray: '/image/melonsunray.png',
};

// Data varietas melon untuk digunakan di TefaPrograms dan diekspor untuk halaman Melon
export const melonData: MelonProgram[] = [
  {
    id: 'greenigal',
    title: 'Melon Greenigal',
    description: 'Melon premium dengan teknologi hidroponik, menghasilkan buah manis dengan net putih yang merata dan rasa yang luar biasa.',
    image: melonImages.greenigal,
    features: ['Net Putih 90%', 'Tangkai Huruf T', 'Buah Keras Merata', 'Brix: 12-15'],
    department: 'Agribisnis Tanaman',
    details: {
      brix: '12 - 15',
      visual: [
        'Net berwarna putih, persentase 90%',
        'Tangkai membentuk huruf T, panjang 20cm dari ujung ke ujung',
        'Buah keras merata diseluruh bagian',
        'Tidak ada spot gundul',
        'Tidak ada net berwarna kecoklatan/ hitam',
        'Ukuran 800gr s/d 2000gr'
      ],
      bentuk: 'Bulat Simetris',
      tekstur: [
        'Sedikit Crunchy',
        'Biji masih menempel sempurna tidak rontok'
      ],
      keunggulan: [
        'Daya simpan yang sangat baik',
        'Konsistensi rasa manis di seluruh bagian buah',
        'Tahan terhadap penyakit jamur dan bakteri',
        'Produktivitas tinggi per tanaman'
      ]
    },
    harvestTime: '58-63 hari setelah tanam',
    idealStorage: 'Suhu 13-15°C dengan kelembaban 85-90%'
  },
  {
    id: 'dalmatian',
    title: 'Melon Dalmatian',
    description: 'Varietas melon dengan ciri khas bintik hijau yang merata, rasa manis dan tekstur daging buah yang padat dan menyegarkan.',
    image: melonImages.dalmatian,
    features: ['Visual Halus', 'Bintik Hijau Merata', 'Buah Keras Merata', 'Brix: 12-15'],
    department: 'Agribisnis Tanaman',
    details: {
      brix: '12 - 15',
      visual: [
        'Visual halus, terkadang memiliki net dan kering/ berwarna putih',
        'Tangkai membentuk huruf T, panjang 20cm dari ujung ke ujung',
        'Bintik hijau merata seperti pola dalmatian',
        'Tidak ada retakan basah',
        'Buah Keras Merata',
        'Ukuran 800gr s/d 2000gr'
      ],
      bentuk: 'Bulat Simetris',
      tekstur: [
        'Tekstur Padat',
        'Biji masih menempel sempurna tidak rontok',
        'Daging buah sedikit berserat yang menambah kenikmatan'
      ],
      keunggulan: [
        'Visual yang unik dan menarik',
        'Rasa manis yang seimbang dengan sedikit rasa segar',
        'Cocok untuk hidangan salad dan buah potong',
        'Daya simpan 10-12 hari pada suhu ruang'
      ]
    },
    harvestTime: '60-65 hari setelah tanam',
    idealStorage: 'Suhu 12-15°C dengan kelembaban 80-85%'
  },
  {
    id: 'greeniesweet',
    title: 'Melon Greeniesweet',
    description: 'Melon manis dengan visual halus atau net tipis, menghasilkan buah yang lezat dengan tekstur daging yang padat dan rasa yang konsisten.',
    image: melonImages.greeniesweet,
    features: ['Visual Halus', 'Net Tipis', 'Buah Keras Merata', 'Brix: 12-15'],
    department: 'Agribisnis Tanaman',
    details: {
      brix: '12 - 15',
      visual: [
        'Visual halus/ memiliki net tipis dan kering',
        'Tangkai membentuk huruf T, panjang 20cm dari ujung ke ujung',
        'Tidak ada spot hijau',
        'Tidak ada retakan basah',
        'Buah keras merata',
        'Ukuran 800gr s/d 2000gr'
      ],
      bentuk: 'Bulat Simetris',
      tekstur: [
        'Tekstur Padat',
        'Biji masih menempel sempurna tidak rontok',
        'Daging buah tebal dengan kandungan air optimal'
      ],
      keunggulan: [
        'Rasa manis yang konsisten dari batch ke batch',
        'Cocok untuk berbagai pengolahan makanan',
        'Tahan terhadap transportasi jarak jauh',
        'Panen dapat dilakukan pada berbagai musim'
      ]
    },
    harvestTime: '58-63 hari setelah tanam',
    idealStorage: 'Suhu 10-15°C dengan kelembaban 80-90%'
  },
  {
    id: 'aruni',
    title: 'Melon Aruni',
    description: 'Varietas melon premium dengan visual halus, menghasilkan buah yang sempurna untuk berbagai hidangan dan memiliki daya simpan yang baik.',
    image: melonImages.aruni,
    features: ['Visual Halus', 'Net Tipis', 'Buah Keras Merata', 'Brix: 12-15'],
    department: 'Agribisnis Tanaman',
    details: {
      brix: '12 - 15',
      visual: [
        'Visual halus/ memiliki net tipis dan kering',
        'Tangkai membentuk huruf T, panjang 20cm dari ujung ke ujung',
        'Tidak ada spot hijau',
        'Tidak ada retakan basah',
        'Buah keras merata',
        'Ukuran 800gr s/d 2000gr'
      ],
      bentuk: 'Oval/ bulat dan Simetris',
      tekstur: [
        'Tekstur Padat',
        'Biji masih menempel sempurna tidak rontok',
        'Daging buah renyah dengan sedikit juice'
      ],
      keunggulan: [
        'Daya simpan yang sangat baik hingga 14 hari',
        'Ketahanan terhadap penyakit dan hama',
        'Warna daging buah yang menarik dan konsisten',
        'Produktivitas tinggi per tanaman'
      ]
    },
    harvestTime: '60-65 hari setelah tanam',
    idealStorage: 'Suhu 12-14°C dengan kelembaban 85-90%'
  },
  {
    id: 'elysia',
    title: 'Melon Elysia',
    description: 'Melon premium dengan net putih merata dan tekstur renyah, menawarkan pengalaman rasa manis yang sempurna dan aroma yang menggoda.',
    image: melonImages.elysia,
    features: ['Net Putih > 70%', 'Lonjong Simetris', 'Tekstur Crunchy', 'Brix: 13-15'],
    department: 'Agribisnis Tanaman',
    details: {
      brix: '13 - 15',
      visual: [
        'Net putih merata, diatas 70%',
        'Tangkai membentuk huruf T (total 20cm panjang dari ujung ke ujung)',
        'Tidak ada net Retak basah (berwarna cokelat/ hitam)',
        'Buah keras merata',
        'Ukuran 800gr s/d 2000gr'
      ],
      bentuk: 'Lonjong Simetris',
      tekstur: [
        'Tekstur Crunchy',
        'Biji masih menempel sempurna tidak rontok',
        'Daging buah tebal dengan warna oranye menarik'
      ],
      keunggulan: [
        'Aroma yang kuat dan menggoda',
        'Tampilan visual yang sangat menarik',
        'Rasa yang seimbang antara manis dan segar',
        'Cocok untuk konsumsi langsung dan sebagai bahan dessert'
      ]
    },
    harvestTime: '62-67 hari setelah tanam',
    idealStorage: 'Suhu 11-14°C dengan kelembaban 85-90%'
  },
  {
    id: 'midori',
    title: 'Melon Midori',
    description: 'Varietas melon premium dengan net putih merata, rasa manis dan tekstur renyah yang membuatnya menjadi pilihan favorit konsumen.',
    image: melonImages.midori,
    features: ['Net Putih > 70%', 'Lonjong Simetris', 'Tekstur Crunchy', 'Brix: 13-15'],
    department: 'Agribisnis Tanaman',
    details: {
      brix: '13 - 15',
      visual: [
        'Net putih merata, diatas 70%',
        'Tangkai membentuk huruf T, panjang 20cm dari ujung ke ujung',
        'Tidak ada net Retak basah (berwarna cokelat/ hitam)',
        'Buah keras merata',
        'Ukuran 800gr s/d 2000gr'
      ],
      bentuk: 'Lonjong Simetris',
      tekstur: [
        'Tekstur Crunchy',
        'Biji masih menempel sempurna tidak rontok',
        'Daging buah tebal dengan ruang biji yang kecil'
      ],
      keunggulan: [
        'Favorit konsumen berdasarkan survei pasar',
        'Konsistensi kualitas sepanjang tahun',
        'Ketahanan terhadap perubahan cuaca',
        'Daya simpan yang baik hingga 12 hari'
      ]
    },
    harvestTime: '60-65 hari setelah tanam',
    idealStorage: 'Suhu 12-15°C dengan kelembaban 85-90%'
  },
  {
    id: 'sunray',
    title: 'Melon Sunray',
    description: 'Melon spesial dengan warna hijau gelap dan semburat kuning, tekstur renyah dan rasa manis yang membuatnya cocok untuk berbagai sajian.',
    image: melonImages.sunray,
    features: ['Hijau Gelap', 'Semburat Kuning', 'Tekstur Crunchy', 'Brix: 13-15'],
    department: 'Agribisnis Tanaman',
    details: {
      brix: '13 - 15',
      visual: [
        'Berwarna Hijau gelap dan memiliki semburat kuning',
        'Tangkai membentuk huruf T, panjang 20cm dari ujung ke ujung',
        'Terkadang memiliki net berwarna putih',
        'Tidak ada net Retak basah (berwarna cokelat/ hitam)',
        'Buah keras merata',
        'Ukuran 800gr s/d 2000gr'
      ],
      bentuk: 'Lonjong Simetris',
      tekstur: [
        'Tekstur Crunchy',
        'Biji masih menempel sempurna tidak rontok',
        'Daging buah tebal dengan warna kuning cerah'
      ],
      keunggulan: [
        'Visual yang unik dan menarik',
        'Kombinasi rasa manis dengan sedikit asam segar',
        'Tahan terhadap penyakit tanaman',
        'Cocok untuk hidangan salad dan buah potong'
      ]
    },
    harvestTime: '63-68 hari setelah tanam',
    idealStorage: 'Suhu 12-15°C dengan kelembaban 85-90%'
  }
];

const TefaPrograms = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // State untuk menampilkan semua program atau hanya 6 di halaman utama
  const [showAll, setShowAll] = useState(false);
  
  // State untuk menampilkan detail program
  const [selectedProgram, setSelectedProgram] = useState<MelonProgram | null>(null);

  // State untuk menambahkan melon baru (untuk demo saja)
  const [melons, setMelons] = useState<MelonProgram[]>(melonData);

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
  
  // Fungsi untuk menampilkan modal detail
  const openProgramDetail = (program: MelonProgram) => {
    setSelectedProgram(program);
    // Tambahkan class untuk mencegah scroll body
    document.body.classList.add('overflow-hidden');
  };
  
  // Fungsi untuk menutup modal detail
  const closeProgramDetail = () => {
    setSelectedProgram(null);
    // Hapus class untuk mengizinkan scroll body
    document.body.classList.remove('overflow-hidden');
  };

  // Filter program yang akan ditampilkan (6 di landing page atau semua jika showAll true)
  const displayedPrograms = showAll ? melons : melons.slice(0, 6);
  
  // Fungsi untuk menangani ketika pengguna ingin melihat semua atau sebagian varietas
  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="tefa" className="py-24 bg-gradient-to-b from-emerald-50 to-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-medium py-1 px-3 rounded-full">
              Inovasi Pertanian
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
            Program <span className="text-emerald-600">Teaching Factory</span> Melon
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Kami mengembangkan berbagai varietas melon premium dengan teknologi hidroponik modern
            untuk menghasilkan buah berkualitas tinggi dengan standar kualitas terbaik.
          </p>
        </motion.div>

        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -left-10 top-20 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute right-20 bottom-10 w-60 h-60 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10"
          >
            {displayedPrograms.map((program, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="h-64 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image 
                    src={program.image} 
                    alt={program.title}
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/80 backdrop-blur-sm text-emerald-800 text-xs font-semibold py-1 px-3 rounded-full">
                      Melon Premium
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-emerald-800 mb-3 group-hover:text-emerald-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {program.description}
                  </p>
                  <div className="border-t border-gray-100 pt-4 mt-2">
                    <h4 className="text-sm font-semibold text-emerald-700 mb-3">Karakteristik:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-2 flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 flex justify-end">
                    <button 
                      onClick={() => openProgramDetail(program)}
                      className="text-emerald-600 font-medium text-sm hover:text-emerald-800 transition-colors flex items-center"
                    >
                      Pelajari Lebih Lanjut
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Toggle Button untuk Lihat Semua atau Lihat Lebih Sedikit */}
          {melons.length > 6 && (
            <div className="mt-12 text-center">
              <button 
                onClick={handleToggleShowAll}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center mx-auto"
              >
                {showAll ? 'Lihat Lebih Sedikit' : 'Lihat Semua Varietas'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={showAll ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                  />
                </svg>
              </button>
            </div>
          )}
          
          {/* Program Detail Modal */}
          {selectedProgram && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div 
                className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-80 sm:h-96">
                  <Image 
                    src={selectedProgram.image} 
                    alt={selectedProgram.title}
                    fill 
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10"></div>
                  
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={closeProgramDetail}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                      Melon Premium
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">{selectedProgram.title}</h2>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-emerald-800 mb-3">Deskripsi</h3>
                    <p className="text-gray-700">{selectedProgram.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-emerald-800 mb-3">Brix (Tingkat Kemanisan)</h3>
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <p className="text-gray-700 font-medium">{selectedProgram.details.brix}</p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-emerald-800 mb-3">Bentuk</h3>
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <p className="text-gray-700 font-medium">{selectedProgram.details.bentuk}</p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-emerald-800 mb-3">Tekstur</h3>
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <ul className="space-y-2">
                            {selectedProgram.details.tekstur.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {selectedProgram.harvestTime && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-emerald-800 mb-3">Waktu Panen</h3>
                          <div className="bg-emerald-50 p-4 rounded-lg">
                            <p className="text-gray-700 font-medium">{selectedProgram.harvestTime}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-emerald-800 mb-3">Visual</h3>
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <ul className="space-y-2">
                            {selectedProgram.details.visual.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {selectedProgram.details.keunggulan && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-emerald-800 mb-3">Keunggulan</h3>
                          <div className="bg-emerald-50 p-4 rounded-lg">
                            <ul className="space-y-2">
                              {selectedProgram.details.keunggulan.map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="h-5 w-5 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                  </div>
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {selectedProgram.idealStorage && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-emerald-800 mb-3">Penyimpanan Ideal</h3>
                          <div className="bg-emerald-50 p-4 rounded-lg">
                            <p className="text-gray-700 font-medium">{selectedProgram.idealStorage}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">                      <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">Bagian dari program TEFA</span>
                        <p className="text-emerald-800 font-medium">{selectedProgram.department}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button 
                          onClick={closeProgramDetail}
                          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                          Tutup
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TefaPrograms;