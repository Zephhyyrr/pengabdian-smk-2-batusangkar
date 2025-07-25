'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Leaf, ArrowRight, Loader2, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { apiRequest } from '@/services/api.service';
import type { Komoditas } from '@/types';

const TefaSlider = () => {
	const [current, setCurrent] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const [komoditas, setKomoditas] = useState<Komoditas[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchKomoditas = async () => {
			try {
				setIsLoading(true);
				// Use actual API if available, otherwise use dummy data
				let data: Komoditas[];

				try {
					// Try to fetch from real API first
					data = await apiRequest({
						endpoint: '/komoditas',
						method: 'GET'
					});

					const processedData = data.map(item => {
						// If foto exists but doesn't start with "/" or "http", add a leading slash
						if (item.foto) {
							if (!item.foto.startsWith('/') && !item.foto.startsWith('http')) {
								return { ...item, foto: `/${item.foto}` };
							}
						} else {
							// If foto is null or undefined, set a default image
							return { ...item, foto: '/image/placeholder.jpg' };
						}
						return item;
					});
					const featuredItems = processedData.slice(0, 4); // Take first 4 items or implement your own logic
					setKomoditas(featuredItems);
				} catch (err) {

					// Fallback to dummy data
					console.log('Falling back to dummy data');
				}

				// Process image paths to ensure they're properly formatted

				// Filter to get only featured items (you can implement your own logic here)

			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch komoditas');
				console.error('Error fetching komoditas:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchKomoditas();
	}, []);

	useEffect(() => {
		if (!isAutoPlaying || komoditas.length === 0) return;

		const interval = setInterval(() => {
			setCurrent((prev) => (prev === komoditas.length - 1 ? 0 : prev + 1));
		}, 5000);

		return () => clearInterval(interval);
	}, [isAutoPlaying, komoditas]);

	const handlePrevious = () => {
		setIsAutoPlaying(false);
		setCurrent((prev) => (prev === 0 ? komoditas.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setIsAutoPlaying(false);
		setCurrent((prev) => (prev === komoditas.length - 1 ? 0 : prev + 1));
	};

	return (
		<div className="relative overflow-hidden bg-gradient-to-b from-school-primary to-green-900 py-24 md:py-32">
			{/* Decorative elements */}
			<div className="absolute top-0 left-0 right-0 h-16 w-full">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
					className="w-full h-full"
				>
					<path
						fill="#ffffff"
						fillOpacity="1"
						d="M0,160L60,181.3C120,203,240,245,360,240C480,235,600,181,720,176C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
					></path>
				</svg>
			</div>

			{/* Light effects */}
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[100px]"></div>
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-[100px]"></div>

			{/* Floating leaf decorations - larger and more visible */}
			<motion.div
				animate={{
					y: [0, -20, 0],
					x: [0, 15, 0],
					rotate: [0, 10, 0],
				}}
				transition={{
					repeat: Infinity,
					duration: 8,
					ease: 'easeInOut',
				}}
				className="absolute top-1/4 left-10 text-green-200/30"
			>
				<Leaf size={120} />
			</motion.div>

			<motion.div
				animate={{
					y: [0, -25, 0],
					x: [0, -10, 0],
					rotate: [0, -5, 0],
				}}
				transition={{
					repeat: Infinity,
					duration: 10,
					ease: 'easeInOut',
				}}
				className="absolute bottom-1/3 right-10 text-green-200/30"
			>
				<Leaf size={100} />
			</motion.div>

			{/* Additional decorative elements */}
			<motion.div
				animate={{
					y: [0, 15, 0],
					scale: [1, 1.05, 1],
				}}
				transition={{
					repeat: Infinity,
					duration: 6,
					ease: 'easeInOut',
				}}
				className="absolute top-1/2 left-1/4 text-green-200/20 hidden lg:block"
			>
				<Leaf size={60} />
			</motion.div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 shadow-lg mb-5"
					>
						<span className="bg-gradient-to-r from-green-400 to-green-200 text-transparent bg-clip-text font-medium">
							Teaching Factory
						</span>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
					>
						Program TEFA <span className="text-green-300">Unggulan</span>
					</motion.h2>

					<motion.div
						initial={{ width: 0 }}
						whileInView={{ width: '120px' }}
						transition={{ duration: 0.7, delay: 0.1 }}
						className="h-1 bg-green-400 mx-auto mb-6 rounded-full"
					/>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl"
					>
						Mengembangkan kompetensi siswa melalui pembelajaran berbasis
						produksi dengan standar industri modern untuk menghasilkan
						lulusan yang siap kerja dan berdaya saing tinggi
					</motion.p>
				</div>

				<div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden border border-white/20">
					{/* Glass effect overlay - enhanced */}
					<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />

					{/* Light accent shapes */}
					<div className="absolute -top-20 -right-20 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
					<div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>

					{isLoading ? (
						<div className="flex items-center justify-center py-16">
							<Loader2 className="h-8 w-8 text-white animate-spin" />
							<p className="ml-3 text-white text-lg">Memuat data komoditas...</p>
						</div>
					) : error ? (
						<div className="text-center py-16">
							<p className="text-white text-lg">{error}</p>
							<button
								className="mt-4 px-6 py-2 bg-white text-green-700 rounded-full hover:bg-green-100 transition-colors"
								onClick={() => window.location.reload()}
							>
								Coba lagi
							</button>
						</div>
					) : komoditas.length === 0 ? (
						<div className="text-center py-16">
							<p className="text-white text-lg">Tidak ada data komoditas yang tersedia</p>
						</div>
					) : (
						<div className="flex flex-col md:flex-row md:items-center justify-between mb-10 relative z-10 gap-4">
							<div className="flex space-x-3 overflow-x-auto pb-2">
								{komoditas.map((item, index) => (
									<button
										key={index}
										onClick={() => {
											setIsAutoPlaying(false);
											setCurrent(index);
										}}
										className={`transition-all duration-300 flex items-center group ${current === index
												? 'opacity-100'
												: 'opacity-60 hover:opacity-90'
											}`}
										aria-label={`Go to slide ${index + 1}`}
									>
										<span className={`w-10 md:w-12 h-1.5 rounded-full ${current === index
												? 'bg-green-400 w-14 md:w-20'
												: 'bg-white/50 group-hover:bg-white/70'
											}`}></span>
										<span className={`ml-2 text-xs md:text-sm text-white ${current === index ? 'font-medium' : 'hidden md:inline-block opacity-70 group-hover:opacity-100'
											}`}>
											{item.nama}
										</span>
									</button>
								))}
							</div>

							<div className="flex items-center space-x-4">
								<span className="text-sm text-white/70 hidden md:inline-block">
									<span className="font-medium text-white">{current + 1}</span>/{komoditas.length}
								</span>

								<button
									onClick={handlePrevious}
									disabled={komoditas.length <= 1}
									className="p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/20 hover:border-white/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
									aria-label="Previous slide"
								>
									<ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
								</button>
								<button
									onClick={handleNext}
									disabled={komoditas.length <= 1}
									className="p-3 md:p-4 bg-school-accent hover:bg-school-accent/90 rounded-full transition-all shadow-lg hover:shadow-school-accent/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
									aria-label="Next slide"
								>
									<ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white" />
								</button>
							</div>
						</div>
					)}

					{!isLoading && !error && komoditas.length > 0 && (
						<AnimatePresence mode="wait">
							<motion.div
								key={current}
								initial={{ opacity: 0, x: 100, scale: 0.95 }}
								animate={{ opacity: 1, x: 0, scale: 1 }}
								exit={{ opacity: 0, x: -100, scale: 0.95 }}
								transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
								className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 relative z-10"
							>
								<div className="lg:w-1/2 w-full">
									<motion.div
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.2, duration: 0.5 }}
										className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl group"
									>
										{/* Animated border effect */}
										<div className="absolute inset-0 rounded-2xl border-2 border-white/30 z-20">
											<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
										</div>

										{/* Conditionally render image or placeholder */}
										{komoditas[current].foto && (komoditas[current].foto.startsWith('/') || komoditas[current].foto.startsWith('http')) ? (
											<Image
												src={komoditas[current].foto}
												alt={komoditas[current].nama}
												fill
												className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
												sizes="(max-width: 768px) 100vw, 50vw"
												priority
												onError={(e) => {
													// If image fails to load, replace with placeholder
													const target = e.target as HTMLImageElement;
													target.style.display = 'none';
													document.getElementById(`placeholder-${current}`)?.classList.remove('hidden');
												}}
											/>
										) : (
											<div id={`placeholder-${current}`} className="absolute inset-0">
												<PlaceholderImage />
											</div>
										)}

										{/* Enhanced gradient overlay - only show for images, not placeholders */}
										{komoditas[current].foto && (
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
										)}

										{/* Stats badge with improved styling */}
										<div className="absolute top-6 left-6 z-20">
											<span className="inline-flex items-center bg-school-accent/90 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium border border-white/20 shadow-xl">
												{komoditas[current].jumlah} {komoditas[current].satuan}
											</span>
										</div>

										{/* Featured badge */}
										<div className="absolute top-6 right-6 z-20">
											<motion.span
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ delay: 0.3, duration: 0.5 }}
												className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-medium border border-white/30 shadow-xl"
											>
												{komoditas[current].jenis.name}
											</motion.span>
										</div>

										{/* Highlight title that appears on image on mobile */}
										<div className="absolute bottom-6 left-6 md:hidden z-20 max-w-[80%]">
											<motion.h3
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.3, duration: 0.5 }}
												className="text-2xl font-bold text-white"
											>
												{komoditas[current].nama}
											</motion.h3>
										</div>
									</motion.div>
								</div>

								<div className="lg:w-1/2 w-full text-center lg:text-left mt-6 lg:mt-0">
									<motion.h3
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3, duration: 0.5 }}
										className="hidden md:block text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-5"
									>
										{komoditas[current].nama}
									</motion.h3>

									<motion.div
										initial={{ width: 0 }}
										animate={{ width: '6rem' }}
										transition={{ delay: 0.4, duration: 0.6 }}
										className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-300 rounded-full mb-6 hidden md:block lg:mx-0 mx-auto"
									></motion.div>

									<motion.p
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.4, duration: 0.5 }}
										className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
									>
										{komoditas[current].deskripsi}
									</motion.p>

									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.5, duration: 0.5 }}
									>
										<Link
											href={`/komoditas/${komoditas[current].id}`}
											className="inline-flex items-center px-7 py-4 bg-school-accent hover:bg-school-accent/90 transition-all text-white rounded-full font-medium group shadow-lg shadow-school-accent/30 hover:shadow-school-accent/50"
										>
											Pelajari Selengkapnya
											<ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
										</Link>
									</motion.div>
								</div>
							</motion.div>
						</AnimatePresence>
					)}
				</div>
			</div>

			{/* Bottom decorative wave - enhanced */}
			<div className="absolute bottom-0 left-0 right-0 h-20 w-full">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
					className="w-full h-full"
				>
					<path
						fill="#f9fafb"
						fillOpacity="1"
						d="M0,96L60,128C120,160,240,224,360,245.3C480,267,600,245,720,224C840,203,960,181,1080,181.3C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
					></path>
				</svg>
			</div>

			{/* Decorative dots at bottom */}
			<motion.div
				animate={{
					y: [-5, 5, -5],
					opacity: [0.3, 0.5, 0.3],
				}}
				transition={{
					repeat: Infinity,
					duration: 4,
					ease: "easeInOut",
				}}
				className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2 z-10"
			>
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className="w-1.5 h-1.5 rounded-full bg-white"
						style={{
							animationDelay: `${i * 0.2}s`,
							opacity: 0.5 + (i * 0.1)
						}}
					></div>
				))}
			</motion.div>

			{/* Subtle noise texture overlay for richer visual */}
			<div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
		</div>
	);
};

// Create a placeholder image component for when no image is available
const PlaceholderImage = ({ className }: { className?: string }) => (
	<div className={`flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 ${className || 'h-full w-full'}`}>
		<div className="flex flex-col items-center justify-center p-6 rounded-full bg-white/30 backdrop-blur-sm shadow-inner">
			<div className="mb-2 text-green-600 opacity-70">
				<ImageIcon size={60} strokeWidth={1.5} />
			</div>
			<p className="text-green-700 text-sm font-medium">Gambar Tidak Tersedia</p>
		</div>
	</div>
);

export default TefaSlider;