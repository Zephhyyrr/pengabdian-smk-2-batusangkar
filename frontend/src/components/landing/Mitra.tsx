'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Handshake, Car, Leaf, Utensils, Users, Building2, Hammer, Bird, Scissors } from 'lucide-react';

// Data mitra dikelompokkan berdasarkan bidang keahlian
const mitraByCategory = [
	{
		id: 'teknik-otomotif',
		category: 'Teknik Otomotif',
		icon: <Car className="text-school-primary" />,
		description: 'Mitra dalam pengembangan keahlian teknik otomotif dan teknologi transportasi',
		partners: [
			{
				name: 'Toyota Astra Motor',
				logo: 'https://images.pexels.com/photos/2539462/pexels-photo-2539462.jpeg',
				url: '#',
			},
			{
				name: 'Honda Prospect Motor',
				logo: 'https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg',
				url: '#',
			},
			{
				name: 'Bengkel Umum Otomindo',
				logo: 'https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg',
				url: '#',
			},
			{
				name: 'PT Logistik Ekspres Indonesia',
				logo: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg',
				url: '#',
			},
		],
	},
	{
		id: 'teknik-pengelasan',
		category: 'Teknik Pengelasan dan Fabrikasi Logam',
		icon: <Hammer className="text-school-primary" />,
		description: 'Mitra dalam pengembangan keahlian pengelasan dan fabrikasi logam',
		partners: [
			{
				name: 'PT Krakatau Steel',
				logo: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg',
				url: '#',
			},
			{
				name: 'PT Indonesia Steel Tube Works',
				logo: 'https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg',
				url: '#',
			},
			{
				name: 'Bengkel Las Mitra Jaya',
				logo: 'https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg',
				url: '#',
			},
		],
	},
	{
		id: 'agribisnis-tanaman',
		category: 'Agribisnis Tanaman',
		icon: <Leaf className="text-school-primary" />,
		description: 'Mitra dalam pengembangan keahlian pertanian dan budidaya tanaman',
		partners: [
			{
				name: 'PT Kebun Bumi Lestari',
				logo: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg',
				url: '#',
			},
			{
				name: 'The Farmhill',
				logo: 'https://images.pexels.com/photos/2333991/pexels-photo-2333991.jpeg',
				description: 'Solo, Jawa Tengah',
				url: '#',
			},
			{
				name: 'Dinas Pertanian Kabupaten Tanah Datar',
				logo: 'https://images.pexels.com/photos/5528995/pexels-photo-5528995.jpeg',
				url: '#',
			},
		],
	},
	{
		id: 'agriteknologi-pengolahan',
		category: 'Agriteknologi Pengolahan Hasil Pertanian',
		icon: <Utensils className="text-school-primary" />,
		description: 'Mitra dalam pengembangan keahlian pengolahan hasil pertanian dan kuliner',
		partners: [
			{
				name: 'Rumah Makan Manndeh',
				logo: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
				url: '#',
			},
			{
				name: 'Toko Kue Zara',
				logo: 'https://images.pexels.com/photos/6605302/pexels-photo-6605302.jpeg',
				url: '#',
			},
		],
	},
	{
		id: 'agribisnis-ternak',
		category: 'Agribisnis Ternak',
		icon: <Bird className="text-school-primary" />,
		description: 'Mitra dalam pengembangan keahlian budidaya ternak dan produk peternakan',
		partners: [
			{
				name: 'PT Charoen Pokphand Indonesia',
				logo: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg',
				url: '#',
			},
			{
				name: 'PT Japfa Comfeed Indonesia',
				logo: 'https://images.pexels.com/photos/1772208/pexels-photo-1772208.jpeg',
				url: '#',
			},
			{
				name: 'Dinas Peternakan Kabupaten Tanah Datar',
				logo: 'https://images.pexels.com/photos/7474293/pexels-photo-7474293.jpeg',
				url: '#',
			},
		],
	},
	{
		id: 'busana',
		category: 'Busana',
		icon: <Scissors className="text-school-primary" />,
		description: 'Mitra dalam pengembangan keahlian desain dan produksi busana',
		partners: [
			{
				name: 'Butik Thamrin City',
				logo: 'https://images.pexels.com/photos/4295441/pexels-photo-4295441.jpeg',
				url: '#',
			},
			{
				name: 'PT Matahari Department Store',
				logo: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg',
				url: '#',
			},
		],
	},
	{
		id: 'agribisnis-ternak',
		category: 'Agribisnis Ternak',
		icon: <Bird className="text-school-primary" />,
		description: 'Mitra dalam pengembangan keahlian budidaya ternak dan produk peternakan',
		partners: [
			{
				name: 'PT Charoen Pokphand Indonesia',
				logo: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg',
				url: '#',
			},
			{
				name: 'PT Japfa Comfeed Indonesia',
				logo: 'https://images.pexels.com/photos/1772208/pexels-photo-1772208.jpeg',
				url: '#',
			},
			{
				name: 'Dinas Peternakan Kabupaten Tanah Datar',
				logo: 'https://images.pexels.com/photos/7474293/pexels-photo-7474293.jpeg',
				url: '#',
			},
		],
	},
	{
		id: 'busana',
		category: 'Busana',
		icon: <Scissors className="text-school-primary" />,
		description: 'Mitra dalam pengembangan keahlian desain dan produksi busana',
		partners: [
			{
				name: 'Butik Thamrin City',
				logo: 'https://images.pexels.com/photos/4295441/pexels-photo-4295441.jpeg',
				url: '#',
			},
			{
				name: 'PT Matahari Department Store',
				logo: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg',
				url: '#',
			},
		],
	},
	{
		id: 'program-magang',
		category: 'Program Magang',
		icon: <Users className="text-school-primary" />,
		description: 'Program magang yang memberikan pengalaman langsung di dunia industri',
		partners: [
			{
				name: 'Youth Farmers Development Program (YFDP)',
				logo: 'https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg',
				url: '#',
			},
		],
	},
	{
		id: 'institusi-pemerintah',
		category: 'Institusi Pemerintah',
		icon: <Building2 className="text-school-primary" />,
		description: 'Kolaborasi dengan berbagai instansi pemerintah',
		partners: [
			{
				name: 'Pemerintah Provinsi Sumatera Barat',
				logo: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg',
				url: '#',
			},
			{
				name: 'Kementerian Pendidikan dan Kebudayaan',
				logo: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg',
				url: '#',
			},
		],
	},
];

const keyAchievements = [
	{ value: '20+', label: 'Mitra Industri' },
	{ value: '12+', label: 'Program Kerja Sama' },
	{ value: '250+', label: 'Lulusan Terserap' },
];

const Mitras = () => {
	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});
	
	// State for active category
	const [activeCategory, setActiveCategory] = useState(mitraByCategory[0].id);
	// State to handle image loading errors
	const [imageError, setImageError] = useState<Record<string, boolean>>({});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, scale: 0.9, y: 20 },
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: { duration: 0.4 },
		},
	};
	
	const tabVariants = {
		inactive: { borderColor: 'transparent', color: '#4B5563' },
		active: { 
			borderColor: '#015E23', 
			color: '#015E23',
			scale: 1.05,
			transition: { duration: 0.3 }
		},
	};
	
	// Get the current active category data
	const activeCategoryData = mitraByCategory.find(cat => cat.id === activeCategory) || mitraByCategory[0];

	return (
		<section
			id="mitra"
			className="py-24 bg-white relative overflow-hidden"
			ref={ref}
		>
			{/* Background decorative elements */}
			<div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gray-50 to-transparent" />
			<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50/50 to-transparent" />

			<div className="absolute -bottom-16 -right-16 w-64 h-64 bg-school-primary/5 rounded-full blur-3xl" />
			<div className="absolute -top-16 -left-16 w-64 h-64 bg-school-accent/5 rounded-full blur-3xl" />

			{/* Pattern overlay */}
			<div className="absolute inset-0 opacity-5 pointer-events-none">
				<div
					className="h-full w-full bg-repeat"
					style={{
						backgroundImage:
							'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23015e23\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
					}}
				/>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center justify-center gap-3 bg-school-primary/10 px-4 py-1.5 rounded-full text-school-primary font-medium text-sm mb-4">
						<Handshake size={18} />
						<span>Kolaborasi Industri</span>
					</div>

					<h2 className="text-3xl md:text-4xl font-bold text-school-primary mb-4">
						Mitra Kerja Sama
					</h2>
					<p className="text-gray-600 max-w-3xl mx-auto">
						Kami berkolaborasi dengan berbagai institusi dan perusahaan untuk
						memastikan program TEFA kami relevan dan berkualitas tinggi, memberikan
						pengalaman pembelajaran terbaik bagi siswa.
					</p>
				</motion.div>

				{/* Key achievements counter */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
					{keyAchievements.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
							className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm text-center"
						>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
								transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
							>
								<p className="text-4xl font-bold text-school-primary mb-2">
									{item.value}
								</p>
								<p className="text-gray-600">{item.label}</p>
							</motion.div>
						</motion.div>
					))}
				</div>
				
				{/* Category Tabs */}
				<div className="mb-12">
					<div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 overflow-x-auto py-2 px-2 md:px-0">
						{mitraByCategory.map((category) => (
							<motion.button
								key={category.id}
								onClick={() => setActiveCategory(category.id)}
								variants={tabVariants}
								animate={activeCategory === category.id ? 'active' : 'inactive'}
								whileHover={{ scale: 1.05 }}
								className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-medium 
                  transition-all duration-300 border-2 bg-white shadow-sm hover:shadow-md
                  ${activeCategory === category.id ? 'border-school-primary text-school-primary bg-school-primary/5' : 'border-transparent text-gray-600'}`}
							>
								<span className="hidden sm:block">{category.icon}</span>
								<span className="whitespace-nowrap">{category.category}</span>
							</motion.button>
						))}
					</div>
					
					{/* Category description */}
					<motion.div 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="text-center mb-8"
					>
						<p className="text-gray-600 max-w-2xl mx-auto">
							{activeCategoryData.description}
						</p>
					</motion.div>
				</div>

				{/* Partners Grid with Animation */}
				<AnimatePresence mode="wait">
					<motion.div
						key={activeCategory}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
					>
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate={inView ? 'visible' : 'hidden'}
							className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 justify-items-center"
						>
							{activeCategoryData.partners.map((partner, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									whileHover={{ y: -5, scale: 1.05 }}
									className="flex flex-col items-center justify-center group w-full"
								>
									<Link href={partner.url} className="relative w-full">
										<div className="aspect-square relative bg-white rounded-2xl p-2 shadow-lg mb-4 overflow-hidden group-hover:shadow-xl transition-all duration-300 w-full max-w-[140px] mx-auto">
											<div className="absolute inset-0 bg-gradient-to-br from-school-primary/5 to-school-accent/5 group-hover:opacity-0 transition-opacity duration-300" />
											<div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												<ExternalLink className="text-white h-6 w-6" />
											</div>
											<Image
												src={partner.logo}
												alt={partner.name}
												fill
												className="object-cover p-1 rounded-xl"
												onError={() => setImageError(prev => ({ ...prev, [partner.name]: true }))}
											/>
											{imageError[partner.name] && (
												<div className="absolute inset-0 flex items-center justify-center bg-white rounded-xl">
													<span className="text-gray-400 text-sm">Logo tidak tersedia</span>
												</div>
											)}
										</div>
									</Link>
									<p className="text-center text-sm text-gray-700 font-medium max-w-[140px] transition-colors group-hover:text-school-primary">
										{partner.name}
									</p>
									{partner.description && (
										<p className="text-center text-xs text-gray-500 mt-1">
											{partner.description}
										</p>
									)}
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				</AnimatePresence>

				{/* Call to action */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-16 text-center"
				>
					<Link
						href="#"
						className="inline-flex items-center px-6 py-3 bg-school-primary text-white rounded-full shadow-lg hover:bg-school-primary/90 transition-colors"
					>
						Jadi Mitra Kami
						<svg
							className="ml-2 w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							></path>
						</svg>
					</Link>
				</motion.div>
			</div>
		</section>
	);
};

export default Mitras;