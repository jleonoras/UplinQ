const Footer = () => {
  const currentYear = new Date().getFullYear();
  const toYear = currentYear; // Initialize toYear
  const fromYear = 2025;
  const myCopyright = "UpLinQ";
  const copyrightDescription = "Drive Link Converter. All rights reserved.";

  // Conditionally determine the footer text
  const footerText = (
    <>
      © {fromYear === toYear ? fromYear : `${fromYear} - ${toYear}`}{" "}
      <span className="font-semibold text-blue-700 dark:text-blue-300 hover:underline cursor-pointer transition-all duration-300">
        {myCopyright}
      </span>{" "}
      - {copyrightDescription}
    </>
  );

  return (
    <footer className="bg-gradient-to-t from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800 animate-fadeIn">
      <div className="container mx-auto p-6 sm:px-8 text-center text-sm text-gray-600 dark:text-gray-400">
        <div>{footerText}</div>
      </div>
    </footer>
  );
};

export default Footer;
