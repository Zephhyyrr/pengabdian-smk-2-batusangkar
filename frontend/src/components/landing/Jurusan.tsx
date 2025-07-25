"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Bike,
  Hammer,
  Leaf,
  Bird,
  FlaskConical,
  Scissors,
  Image as ImageIcon,
} from "lucide-react";

const jurusan = [
  {
    name: "Teknik Otomotif",
    description:
      "Membekali siswa dengan keterampilan perawatan, perbaikan, dan pemeliharaan kendaraan dengan standar industri otomotif modern.",
    icon: <Car className="h-12 w-12 text-white" />,
    color: "bg-blue-600",
    image: "/image/teknik kendaraan ringan otomotif.png",
  },
  {
    name: "Teknik Pengelasan dan Fabrikasi Logam",
    description:
      "Mempersiapkan siswa dengan keterampilan pengelasan profesional dan fabrikasi logam sesuai standar industri untuk berbagai aplikasi konstruksi dan manufaktur.",
    icon: <Hammer className="h-12 w-12 text-white" />,
    color: "bg-orange-600",
    image: "/image/teknik pengelasan.png",
  },
  {
    name: "Agribisnis Tanaman",
    description:
      "Membekali siswa dengan keterampilan budidaya tanaman pangan dan hortikultura menggunakan teknologi pertanian modern dan berkelanjutan.",
    icon: <Leaf className="h-12 w-12 text-white" />,
    color: "bg-green-600",
    image: "null",
  },
  {
    name: "Agribisnis Ternak",
    description:
      "Program keahlian yang memfokuskan pada budidaya ternak dengan metode modern untuk memenuhi kebutuhan protein hewani berkualitas.",
    icon: <Bird className="h-12 w-12 text-white" />,
    color: "bg-emerald-600",
    image: "null",
  },
  {
    name: "Agriteknologi Pengolahan Hasil Pertanian",
    description:
      "Mempersiapkan siswa untuk mengolah hasil pertanian menjadi produk bernilai tambah dengan penerapan teknologi pengolahan pangan modern.",
    icon: <FlaskConical className="h-12 w-12 text-white" />,
    color: "bg-teal-600",
    image: "/image/agribisni pengolahan hasil pertanian.jpg",
  },
  {
    name: "Busana",
    description:
      "Mengembangkan keterampilan desain, pola, dan produksi busana dengan memadukan teknik tradisional dan teknologi modern.",
    icon: <Scissors className="h-12 w-12 text-white" />,
    color: "bg-purple-600",
    image: "/image/busana.png",
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="jurusan"
      className="py-24 bg-gradient-to-b from-emerald-50 to-white"
      ref={ref}
    >
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-medium py-1 px-3 rounded-full">
              Bidang Keahlian
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-800">
            Program <span className="text-emerald-600">Keahlian</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            SMK 2 Batusangkar menawarkan berbagai program keahlian dengan fokus
            unggulan di bidang agribisnis dan teknik yang dirancang untuk
            mempersiapkan siswa menghadapi kebutuhan dunia industri modern.
          </p>
        </motion.div>

        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -right-20 top-20 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -left-10 bottom-10 w-60 h-60 bg-emerald-50 rounded-full blur-3xl opacity-40"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
          >
            {jurusan.map((dept, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col border border-gray-100"
              >
                {dept.image && dept.image !== "null" ? (
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image
                      src={dept.image}
                      alt={dept.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                      <div className={`p-2 ${dept.color} rounded-lg`}>
                        {dept.icon}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-xs font-semibold py-1 px-3 rounded-full text-gray-800">
                      Program Keahlian
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${dept.color} relative h-48 md:h-56 flex items-center justify-center overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-white/30"
                          style={{
                            width: `${Math.random() * 40 + 10}px`,
                            height: `${Math.random() * 40 + 10}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${
                              Math.random() * 6 + 3
                            }s infinite ease-in-out`,
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="rounded-xl p-8 bg-white/20 backdrop-blur-sm transform transition-transform duration-500 group-hover:scale-110">
                      {dept.icon}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-xs font-semibold py-1 px-3 rounded-full text-gray-800">
                      Program Keahlian
                    </div>
                  </div>
                )}
                <div className="p-6 md:p-8 flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-gray-600">{dept.description}</p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                      href={
                        dept.name === "Teknik Otomotif"
                          ? "/jurusan/teknik-otomotif"
                          : dept.name ===
                            "Teknik Pengelasan dan Fabrikasi Logam"
                          ? "/jurusan/TP&FL"
                          : dept.name === "Agribisnis Tanaman"
                          ? "/jurusan/Agribisnis-Tanaman"
                          : dept.name === "Agribisnis Ternak"
                          ? "/jurusan/Agribisnis-Ternak"
                          : dept.name ===
                            "Agriteknologi Pengolahan Hasil Pertanian"
                          ? "/jurusan/Agriteknologi-Pengolahan-Hasil-Pertanian"
                          : dept.name === "Busana"
                          ? "/jurusan/busana"
                          : "#"
                      }
                      className="text-sm font-medium text-emerald-600 flex items-center hover:text-emerald-800 transition-colors"
                    >
                      Pelajari lebih lanjut
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Jurusans;
