import { useState } from "react"; // Import useState for modal control
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Rocket,
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
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main className="flex-grow">
        {/* Hero Section remains on the base white background */}
        <section className="px-4 py-20 text-center sm:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3"
            >
              <Rocket className="w-10 h-10 text-indigo-500 sm:w-12 sm:h-12" />
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                UplinQ
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto mt-6 text-base leading-relaxed text-gray-600 dark:text-gray-400"
            >
              The simplest way to convert Google Drive links to direct downloads
              and remote upload files across the web.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400"
            >
              <span>
                For best results, please use a file shared with &apos;Anyone
                with the link&apos;.
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <HelpCircle className="w-4 h-4" />
                How?
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <LinkForm />
          </motion.div>
        </section>

        {/* Features Section now has a distinct light gray background for separation. */}
        <section className="py-20 sm:py-24 bg-gray-50 dark:bg-black/20">
          <motion.div
            className="max-w-5xl px-4 mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
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
                className="!pb-10"
              >
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
