'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Loader2, ImageIcon, ArrowLeft, Search, X } from 'lucide-react';
import { apiRequest } from '@/services/api.service';

// Define TypeScript interfaces for data structure
interface KomoditasDetails {
  brix?: string;
  visual?: string[];
  bentuk?: string;
  tekstur?: string[];
  keunggulan?: string[];
}

interface Komoditas {
  id: string;
  id_jenis?: number;
  nama: string;
  deskripsi: string;
  foto: string;
  features?: string[];
  jumlah: number;
  satuan: string;
  jenis?: { 
    name: string; 
  };
  updated_at: string;
}

// Interface for API response - exactly matching the database schema and controller response
interface ApiKomoditas {
  id: number;
  id_jenis: number;
  nama: string;
  deskripsi: string;
  foto: string;
  satuan: string;
  jumlah: number;
  jenis: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Define sorting types
type SortOption = 'name-asc' | 'name-desc' | 'stock-asc' | 'stock-desc' | 'date-newest' | 'date-oldest';


const KomoditasPage = () => {
  // State for API data
  const [komoditas, setKomoditas] = useState<Komoditas[]>([]);
  const [filteredKomoditas, setFilteredKomoditas] = useState<Komoditas[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'available'>('all');
  const [categories, setCategories] = useState<string[]>([]);
  
  // State for modal
  const [selectedKomoditas, setSelectedKomoditas] = useState<Komoditas | null>(null);
  
  // Intersection observer for animations
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Fetch komoditas data from API
  useEffect(() => {
    const fetchKomoditas = async () => {
      try {
        setIsLoading(true);
        
        console.log('Fetching komoditas data from public endpoint for catalog page');
        
        try {
          // Use the public endpoint instead of the protected one
          const response = await apiRequest({
            endpoint: '/public/komoditas',
            method: 'GET'
          });
          
          if (response && Array.isArray(response)) {
            // Process data to match our interface with exactly what's available in the database
            const processedData = response.map((item: any) => ({
              id: String(item.id),
              id_jenis: item.id_jenis,
              nama: item.nama || 'Untitled Komoditas',
              deskripsi: item.deskripsi || 'Deskripsi tidak tersedia',
              foto: item.foto?.startsWith('http') 
                ? item.foto 
                : `/image/${item.foto?.replace('/image/', '') || 'placeholder.jpg'}`,
              jumlah: item.jumlah || 0,
              satuan: item.satuan || 'unit',
              jenis: { name: item.jenis?.name || 'Umum' },
              updated_at: item.updatedAt || new Date().toISOString()
            }));
            setKomoditas(processedData);
            setFilteredKomoditas(processedData);
            return; // Exit early if successful
          }
        } catch (apiError) {
          console.warn('API request failed:', apiError);
          // Continue to fallback
        }
      
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch komoditas');
        console.error('Error in komoditas component:', err);
        
        // Fallback to empty arrays if everything fails
        setKomoditas([]);
        setFilteredKomoditas([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKomoditas();
  }, []);

  // Filter komoditas based on search query
  useEffect(() => {
    if (komoditas) {
      let filtered = [...komoditas];
      
      // Apply search filter
      if (searchQuery.trim() !== '') {
        filtered = filtered.filter(item => 
          item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.deskripsi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.jenis?.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply category filter
      if (categoryFilter !== 'all') {
        filtered = filtered.filter(item => item.jenis?.name === categoryFilter);
      }
      
      // Apply stock availability filter
      if (stockFilter === 'available') {
        filtered = filtered.filter(item => item.jumlah > 0);
      }
      
      setFilteredKomoditas(filtered);
    }
  }, [searchQuery, komoditas, categoryFilter, stockFilter]);

  // Sort komoditas based on selected option
  useEffect(() => {
    if (filteredKomoditas) {
      let sorted = [...filteredKomoditas];
      
      switch (sortBy) {
        case 'name-asc':
          sorted.sort((a, b) => a.nama.localeCompare(b.nama));
          break;
        case 'name-desc':
          sorted.sort((a, b) => b.nama.localeCompare(a.nama));
          break;
        case 'stock-asc':
          sorted.sort((a, b) => a.jumlah - b.jumlah);
          break;
        case 'stock-desc':
          sorted.sort((a, b) => b.jumlah - a.jumlah);
          break;
        case 'date-newest':
          sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
          break;
        case 'date-oldest':
          sorted.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
          break;
        default:
          break;
      }
      
      setFilteredKomoditas(sorted);
    }
  }, [sortBy, filteredKomoditas]);

  // Modal functions
  const openKomoditasDetail = (item: Komoditas) => {
    setSelectedKomoditas(item);
    document.body.classList.add('overflow-hidden');
  };
  
  const closeKomoditasDetail = () => {
    setSelectedKomoditas(null);
    document.body.classList.remove('overflow-hidden');
  };

  // Clear search function
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header section */}
      <div className="bg-emerald-800 py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-700/50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-10 w-60 h-60 bg-emerald-600/40 rounded-full blur-[80px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center mb-6">
            <Link href="/landing" className="flex items-center text-emerald-100 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Katalog Komoditas <span className="text-emerald-300">TEFA</span>
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl max-w-3xl mb-10">
              Jelajahi berbagai komoditas hasil produksi Teaching Factory SMK Negeri 2 Batusangkar
              dengan kualitas premium dan teknologi modern.
            </p>
            
            {/* Search and sort bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              {/* Search bar */}
              <div className="relative w-full max-w-xl mb-4 md:mb-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-emerald-300" />
                </div>
                <input
                  type="text"
                  placeholder="Cari komoditas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 py-4 w-full bg-white/10 border border-emerald-600 rounded-lg text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent shadow-md"
                />
                {searchQuery && (
                  <button 
                    onClick={clearSearch} 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5 text-emerald-300 hover:text-white" />
                  </button>
                )}
              </div>
              
              {/* Sort and filter section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 w-full">
                {/* Sort by dropdown */}
                <div className="relative w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none bg-white/10 border border-emerald-600 rounded-lg text-white py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent shadow-md"
                    aria-label="Urutkan berdasarkan"
                  >
                    <option value="name-asc">Nama A-Z</option>
                    <option value="name-desc">Nama Z-A</option>
                    <option value="stock-asc">Stok Terendah</option>
                    <option value="stock-desc">Stok Tertinggi</option>
                    <option value="date-newest">Terbaru</option>
                    <option value="date-oldest">Terlama</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Category filter */}
                <div className="relative w-full sm:w-auto">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none bg-white/10 border border-emerald-600 rounded-lg text-white py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent shadow-md"
                    aria-label="Filter berdasarkan kategori"
                  >
                    <option value="all">Semua Kategori</option>
                    {Array.from(new Set(komoditas
                      .filter(item => item.jenis?.name) // Filter out items with no category
                      .map(item => item.jenis?.name)))
                      .sort() // Sort categories alphabetically
                      .map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))
                    }
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Stock availability filter */}
                <div className="relative w-full sm:w-auto">
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value as 'all' | 'available')}
                    className="appearance-none bg-white/10 border border-emerald-600 rounded-lg text-white py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent shadow-md"
                    aria-label="Filter berdasarkan ketersediaan stok"
                  >
                    <option value="all">Semua Stok</option>
                    <option value="available">Hanya yang Tersedia</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Catalog grid section */}
      <div className="py-16" ref={ref}>
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="py-20">
              <div className="flex items-center justify-center mb-8">
                <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
                <p className="ml-3 text-emerald-800 text-lg">Memuat data komoditas...</p>
              </div>
              
              {/* Skeleton loading UI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
                    <div className="h-64 relative bg-gray-200 animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-emerald-800 text-lg">{error}</p>
              <button
                className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 transition-colors"
                onClick={() => window.location.reload()}
              >
                Coba lagi
              </button>
            </div>
          ) : filteredKomoditas.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-emerald-800 text-lg">Tidak ada komoditas yang sesuai dengan pencarian Anda</p>
              <button
                className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 transition-colors"
                onClick={() => {
                  setSearchQuery('');
                }}
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-emerald-800">
                  {filteredKomoditas.length} Komoditas
                  {searchQuery ? ` untuk pencarian "${searchQuery}"` : ''}
                  {categoryFilter !== 'all' ? ` dalam kategori "${categoryFilter}"` : ''}
                  {stockFilter === 'available' ? ' dengan stok tersedia' : ''}
                </h2>
                <p className="text-gray-600 mt-2">
                  {filteredKomoditas.reduce((total, item) => total + item.jumlah, 0)} total unit dari {komoditas.length} jenis komoditas
                </p>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              >
                {filteredKomoditas.map((item, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="h-64 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {item.foto ? (
                        <Image 
                          src={item.foto.startsWith('http') ? item.foto : `/image/${item.foto.replace('/image/', '')}`} 
                          alt={item.nama}
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/image/placeholder.jpg';
                          }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 4} // Load first 4 images with priority
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
                          <div className="p-6 rounded-full bg-white/30 backdrop-blur-sm shadow-inner">
                            <ImageIcon size={60} className="text-emerald-600 opacity-70" />
                            <p className="mt-2 text-emerald-700 text-sm font-medium">Gambar Tidak Tersedia</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-white/80 backdrop-blur-sm text-emerald-800 text-xs font-semibold py-1 px-3 rounded-full">
                          Kategori: {item.jenis?.name || 'Umum'}
                        </span>
                      </div>
                      
                      {/* Quantity badge */}
                      <div className="absolute bottom-4 right-4 z-10">
                        <span className={`${
                          item.jumlah > 0 
                            ? 'bg-emerald-600/90' 
                            : 'bg-rose-600/90'
                          } backdrop-blur-sm text-white text-xs font-semibold py-1 px-3 rounded-full`}>
                          Stok: <span className="font-bold">{item.jumlah}</span> {item.satuan}
                        </span>
                      </div>
                      
                      {/* View details button on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <button
                          onClick={() => openKomoditasDetail(item)}
                          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-lg transition-all transform hover:scale-105"
                        >
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-emerald-800 mb-2 group-hover:text-emerald-600 transition-colors">
                        {item.nama}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {item.deskripsi || "Informasi detail tentang komoditas ini akan segera hadir."}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                          <span>Kategori: {item.jenis?.name || "Umum"}</span>
                        </div>
                        <div>
                          <span>Stok: {item.jumlah} {item.satuan}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => openKomoditasDetail(item)}
                        className="text-emerald-600 font-medium text-sm hover:text-emerald-800 transition-colors flex items-center"
                      >
                        Pelajari Lebih Lanjut
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
      
      {/* DETAIL MODAL */}
      {selectedKomoditas && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 sm:h-96">
              <Image 
                src={
                  selectedKomoditas.foto 
                    ? (selectedKomoditas.foto.startsWith('http') 
                        ? selectedKomoditas.foto 
                        : `/image/${selectedKomoditas.foto.replace('/image/', '')}`)
                    : '/image/placeholder.jpg'
                } 
                alt={selectedKomoditas.nama}
                fill 
                className="object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/image/placeholder.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10"></div>
              
              <div className="absolute top-4 right-4">
                <button 
                  onClick={closeKomoditasDetail}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                  Kategori: {selectedKomoditas.jenis?.name || "Umum"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">{selectedKomoditas.nama}</h2>
              </div>
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-emerald-800 mb-3">Deskripsi</h3>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedKomoditas.deskripsi || "Deskripsi tidak tersedia."}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-emerald-800 mb-3">Informasi Komoditas</h3>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <div className="flex justify-between py-2 border-b border-emerald-100">
                        <span className="text-gray-600">ID</span>
                        <span className="font-medium text-emerald-800">{selectedKomoditas.id}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-emerald-100">
                        <span className="text-gray-600">ID Jenis</span>
                        <span className="font-medium text-emerald-800">{selectedKomoditas.id_jenis ?? '-'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-emerald-100">
                        <span className="text-gray-600">Nama</span>
                        <span className="font-medium text-emerald-800">{selectedKomoditas.nama}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-emerald-100">
                        <span className="text-gray-600">Kategori</span>
                        <span className="font-medium text-emerald-800">{selectedKomoditas.jenis?.name || "Umum"}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-emerald-100">
                        <span className="text-gray-600">Jumlah</span>
                        <span className="font-medium text-emerald-800">{selectedKomoditas.jumlah}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-emerald-100">
                        <span className="text-gray-600">Satuan</span>
                        <span className="font-medium text-emerald-800">{selectedKomoditas.satuan}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-emerald-100">
                        <span className="text-gray-600">isDeleted</span>
                        <span className="font-medium text-emerald-800">{'isDeleted' in selectedKomoditas ? (selectedKomoditas.isDeleted ? 'Ya' : 'Tidak') : '-'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-emerald-100">
                        <span className="text-gray-600">Tanggal Dibuat</span>
                        <span className="font-medium text-emerald-800">-</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Terakhir Diperbarui</span>
                        <span className="font-medium text-emerald-800">{selectedKomoditas.updated_at ? new Date(selectedKomoditas.updated_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-emerald-800 mb-3">Fitur Produk</h3>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          </div>
                          <span className="text-gray-700">Nama komoditas: <span className="font-medium">{selectedKomoditas.nama}</span></span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          </div>
                          <span className="text-gray-700">Kategori: <span className="font-medium">{selectedKomoditas.jenis?.name || "Umum"}</span></span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-1 mr-3">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          </div>
                          <span className="text-gray-700">Jumlah tersedia: <span className="font-medium">{selectedKomoditas.jumlah} {selectedKomoditas.satuan}</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Bagian dari program TEFA</span>
                    <p className="text-emerald-800 font-medium">SMK NEGERI 2 BATUSANGKAR</p>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={closeKomoditasDetail}
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
    </main>
  );
};

export default KomoditasPage;
