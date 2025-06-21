// Defines animation variants for a container element.
// Used with Framer Motion to create staggered animations for child elements.
export const containerVariants = {
  // Initial state: hidden
  hidden: { opacity: 0 },
  // Visible state: fades in and orchestrates child animations.
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: "easeInOut" },
  },
};

// Defines animation variants for individual items within a container.
// Creates a "slide up and fade in" effect.
export const itemVariants = {
  // Initial state: shifted down and hidden.
  hidden: { y: 20, opacity: 0 },
  // Visible state: returns to original position and becomes fully visible.
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};
