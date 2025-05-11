const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800 animate-fadeIn">
      <div className="container mx-auto p-6 sm:px-8 text-center text-sm text-gray-600 dark:text-gray-400">
        <div>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-blue-700 dark:text-blue-300 hover:underline cursor-pointer transition-all duration-300">
            UpLinQ
          </span>{" "}
          - Drive Link Converter. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
