import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { itemVariants } from "../utils/animations";

// A reusable card component to display a single feature with the new minimalist design.
const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-col h-full p-6 text-left bg-gray-100 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700"
  >
    {/* The icon is now displayed cleanly without a background circle */}
    <div className="mb-5">{icon}</div>
    <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
      {title}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

// Define PropTypes to ensure the component receives the correct data types.
FeatureCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCard;
