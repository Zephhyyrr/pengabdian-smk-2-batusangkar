'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="kontak" className="bg-school-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1" />
                <span>Jl. Soekarno Hatta No. 123, Batusangkar, Kabupaten Tanah Datar, Sumatera Barat 27213</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <span>(0752) 123456</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <span>info@smk2batusangkar.sch.id</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3" />
                <span>Senin - Jumat: 07.00 - 16.00 WIB</span>
              </li>
            </ul>
          </div>

          {/* TEFA Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Program TEFA</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-school-accent transition-colors">
                  Melon Hidroponik
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-school-accent transition-colors">
                  Peternakan Ayam
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-school-accent transition-colors">
                  Sayuran Hidroponik
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-school-accent transition-colors">
                  Kunjungan Industri
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-school-accent transition-colors">
                  Magang Siswa
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-school-accent transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-school-accent transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#jurusan" className="hover:text-school-accent transition-colors">
                  Program Keahlian
                </Link>
              </li>
              <li>
                <Link href="#tefa" className="hover:text-school-accent transition-colors">
                  Program TEFA
                </Link>
              </li>
              <li>
                <Link href="#mitra" className="hover:text-school-accent transition-colors">
                  Mitra Kerja Sama
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Map */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Temukan Kami</h3>
            <div className="mb-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.681303701432!2d100.63194067492458!3d-0.49999229953799765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2ab5bbf8aaaaab%3A0x5d5677e162f8fbee!2sBatusangkar%2C%20Kabupaten%20Tanah%20Datar%2C%20Sumatera%20Barat!5e0!3m2!1sid!2sid!4v1710221234567!5m2!1sid!2sid" 
                width="100%" 
                height="150" 
                style={{ border: 0 }} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="SMK 2 Batusangkar Location"
              ></iframe>
            </div>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="hover:text-school-accent transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-school-accent transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-school-accent transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} SMK 2 Batusangkar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;