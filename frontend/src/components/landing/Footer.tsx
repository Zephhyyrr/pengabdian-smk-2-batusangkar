'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="kontak" className="relative bg-gradient-to-b from-emerald-900 to-emerald-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI1MHB4IiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTAgNTEuNzZjMzYuMjEtMi4yNSA3Ny41Ny0zLjU4IDEyNi40Mi0zLjU4IDMyMCAwIDMyMCA1NyA2NDAgNTcgMjcxLjE1IDAgMzEyLjU4LTQwLjkxIDUxMy41OC01My40VjBIMFoiIGZpbGwtb3BhY2l0eT0iLjMiLz48cGF0aCBkPSJNMCAyNC4zMWM0My40Ni01LjY5IDk0LjU2LTkuMjUgMTU4LjQyLTkuMjUgMzIwIDAgMzIwIDg5LjI0IDY0MCA4OS4yNCAyNTYuMTMgMCAzMDcuMjgtNTcuMTYgNDgxLjU4LTgwVjBIMFoiIGZpbGwtb3BhY2l0eT0iLjUiLz48cGF0aCBkPSJNMCAwdjMuNEMyOC4yIDEuNiA1OS40LjU5IDk0LjQyLjU5YzMyMCAwIDMyMCA4NC4zIDY0MCA4NC4zIDI4NSAwIDMxNi4xNy02Ni44NSA1NDUuNTgtODEuNDlWMFoiLz48L2c+PC9zdmc+')]"></div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* School Info */}
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">SMK 2 <span className="text-green-300">Batusangkar</span></h2>
              <p className="text-emerald-100/80 text-sm">Pusat Unggulan Teaching Factory</p>
            </div>
            
            <p className="text-emerald-100/70 mb-6 leading-relaxed">
              Mengembangkan keterampilan dan karakter siswa melalui pembelajaran inovatif dan praktik kerja industri dalam bidang perkebunan dan pertanian modern.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center border border-emerald-300/30 hover:bg-emerald-800 hover:border-emerald-300/80 transition-all">
                <Instagram className="h-4 w-4 text-emerald-300" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full flex items-center justify-center border border-emerald-300/30 hover:bg-emerald-800 hover:border-emerald-300/80 transition-all">
                <Facebook className="h-4 w-4 text-emerald-300" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full flex items-center justify-center border border-emerald-300/30 hover:bg-emerald-800 hover:border-emerald-300/80 transition-all">
                <Twitter className="h-4 w-4 text-emerald-300" />
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-emerald-700 pb-2">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-emerald-300 flex-shrink-0 mt-1" />
                <span className="text-emerald-100/80 text-sm">Jl. Soekarno Hatta No. 123, Batusangkar, Kabupaten Tanah Datar, Sumatera Barat 27213</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-emerald-300 flex-shrink-0" />
                <span className="text-emerald-100/80 text-sm">(0752) 123456</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-emerald-300 flex-shrink-0" />
                <span className="text-emerald-100/80 text-sm">info@smk2batusangkar.sch.id</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-emerald-300 flex-shrink-0" />
                <span className="text-emerald-100/80 text-sm">Senin - Jumat: 07.00 - 16.00 WIB</span>
              </li>
            </ul>
          </div>

          {/* TEFA Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-emerald-700 pb-2">Program TEFA</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#tefa" className="text-emerald-100/80 text-sm hover:text-green-300 transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></div>
                  Agribisnis Tanaman
                </Link>
              </li>
              <li>
                <Link href="#tefa" className="text-emerald-100/80 text-sm hover:text-green-300 transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></div>
                  Agribisnis Ternak
                </Link>
              </li>
              <li>
                <Link href="#tefa" className="text-emerald-100/80 text-sm hover:text-green-300 transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></div>
                  Agriteknologi Pengolahan
                </Link>
              </li>
              <li>
                <Link href="#tefa" className="text-emerald-100/80 text-sm hover:text-green-300 transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></div>
                  Teknik Pengelasan
                </Link>
              </li>
              <li>
                <Link href="#tefa" className="text-emerald-100/80 text-sm hover:text-green-300 transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></div>
                  Teknik Otomotif
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-emerald-700 pb-2">Tautan Cepat</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-emerald-100/80 text-sm hover:text-green-300 transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></div>
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-emerald-100/80 text-sm hover:text-green-300 transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></div>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#jurusan" className="text-emerald-100/80 text-sm hover:text-green-300 transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></div>
                  Program Keahlian
                </Link>
              </li>
              <li>
                <Link href="#tefa" className="text-emerald-100/80 text-sm hover:text-green-300 transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></div>
                  Program TEFA
                </Link>
              </li>

              <li>
                <Link href="#mitra" className="text-emerald-100/80 text-sm hover:text-green-300 transition-colors flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2.5"></div>
                  Mitra Kerja Sama
                </Link>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="lg:col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-emerald-700 pb-2">Lokasi Kami</h3>
            <div className="rounded-xl overflow-hidden shadow-lg border-4 border-emerald-800">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.681303701432!2d100.63194067492458!3d-0.49999229953799765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2ab5bbf8aaaaab%3A0x5d5677e162f8fbee!2sBatusangkar%2C%20Kabupaten%20Tanah%20Datar%2C%20Sumatera%20Barat!5e0!3m2!1sid!2sid!4v1710221234567!5m2!1sid!2sid" 
                width="100%" 
                height="170" 
                style={{ border: 0 }} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="SMK 2 Batusangkar Location"
              ></iframe>
            </div>
            <p className="mt-3 text-emerald-100/60 text-xs">Kunjungi sekolah kami untuk informasi lebih lanjut dan pendaftaran.</p>
          </div>
        </div>

        <div className="border-t border-emerald-800/80 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-emerald-100/70 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Developed by{" "}
            <span className="group relative cursor-pointer text-emerald-300 font-medium hover:underline">
              Team Pengabdian PNP
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 shadow-lg transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none z-10 border border-emerald-600/50">
                <span className="block text-center font-bold text-emerald-300 mb-2 border-b border-emerald-600/30 pb-1">Tim Pengembang</span>
                Defni, S.Si., M.Kom.<br />
                Ainil Mardiah, S.Kom., M.Cs<br />
                Firman Ardiyansyah<br />
                Redho Septa Yudien<br />
                Baghaztra Van Ril<br />
                Pito Desri Pauzi<br />
                Azmi Ali
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-emerald-800"></span>
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;