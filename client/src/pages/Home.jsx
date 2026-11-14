import { useState } from "react"; // Import useState for modal control
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
	UploadCloud,
	Link as LinkIcon,
	FileText,
	HelpCircle,
} from "lucide-react"; // Import HelpCircle
import LinkForm from "../components/LinkForm";
import FeatureCard from "../components/FeatureCard";
import HowToModal from "../components/HowToModal"; // Import the modal component
import { containerVariants, itemVariants } from "../utils/animations";

const featuresData = [
	{
		icon: <UploadCloud className="w-7 h-7 text-indigo-500" />,
		title: "Remote Upload",
		description:
			"Upload files directly from a URL without downloading them first.",
	},
	{
		icon: <LinkIcon className="w-7 h-7 text-indigo-500" />,
		title: "Direct Downloads",
		description:
			"Generate permanent direct download links from Google Drive files.",
	},
	{
		icon: <FileText className="w-7 h-7 text-indigo-500" />,
		title: "Large File Support",
		description:
			"Our service is optimized for sharing large video files with ease.",
	},
];

const Home = () => {
	// State to manage the visibility of the help modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		// The main background is now white, providing a clean base.
		<div className="flex flex-col font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
			<main className="flex-grow">
				<section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={containerVariants}
						className="max-w-xl">
						<motion.div
							variants={itemVariants}
							className="mb-5 flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
							<span className="h-px w-7 bg-indigo-500" />
							<span>Drive link converter</span>
						</motion.div>
						<motion.h1
							variants={itemVariants}
							className="text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
							UplinQ
						</motion.h1>
						<motion.p
							variants={itemVariants}
							className="mt-5 max-w-lg text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
							Turn a Google Drive share link into a direct-download or
							remote-upload link.
						</motion.p>
						<motion.div
							variants={itemVariants}
							className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
							<span>
								Files work best when shared with “Anyone with the link.”
							</span>
							<button
								type="button"
								onClick={() => setIsModalOpen(true)}
								className="inline-flex items-center gap-1 font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
								<HelpCircle className="h-4 w-4" />
								How to share
							</button>
						</motion.div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.15 }}
						className="w-full max-w-2xl lg:justify-self-end">
						<div className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
							Paste a Google Drive link
						</div>
						<LinkForm />
						<p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
							Your file stays in Google Drive.
						</p>
					</motion.div>
				</section>

				{/* Features Section now has a distinct light gray background for separation. */}
				<section className="mx-4 rounded-3xl bg-gray-50 pt-20 pb-10 dark:bg-black/20 md:py-20">
					<motion.div
						className="max-w-5xl px-4 mx-auto"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
						variants={containerVariants}>
						<motion.div variants={itemVariants} className="mb-12 text-center">
							<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
								One Tool, Multiple Solutions
							</h2>
							<p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-400">
								UplinQ simplifies your file-sharing workflow with a suite of
								powerful, easy-to-use features.
							</p>
						</motion.div>

						{/* Desktop Grid (hidden on mobile) */}
						<div className="hidden md:grid md:grid-cols-3 md:gap-8">
							{featuresData.map((feature) => (
								<FeatureCard key={feature.title} {...feature} />
							))}
						</div>

						{/* Mobile Carousel (hidden on desktop) */}
						<div className="md:hidden">
							<Swiper
								modules={[Pagination]}
								spaceBetween={16}
								slidesPerView={1.2}
								centeredSlides={true}
								pagination={{ clickable: true }}
								className="!pb-10">
								{featuresData.map((feature) => (
									<SwiperSlide key={feature.title}>
										<FeatureCard {...feature} />
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</motion.div>
				</section>
			</main>

			{/* The modal is now rendered by the Home page */}
			<HowToModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	);
};

export default Home;
