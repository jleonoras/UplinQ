import { Rocket } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Updated background to match the Home page's section for uniformity.
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      {/* Use the same max-width and padding for consistent layout */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright Text */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
            &copy; {currentYear} <span className="font-semibold">UplinQ.</span>{" "}
            All rights reserved.
          </p>

          {/* Brand Link */}
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            <Rocket className="w-5 h-5 text-indigo-500" />
            <span className="font-semibold">Powered by UplinQ</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
