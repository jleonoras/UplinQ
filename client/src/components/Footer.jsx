const Footer = () => {
  const currentYear = new Date().getFullYear();
  const toYear = currentYear; // Initialize toYear
  const fromYear = 2025;
  const myCopyright = "UpLinQ";
  const copyrightDescription = "All rights reserved.";

  // Conditionally determine the footer text
  const footerText = (
    <>
      © {fromYear === toYear ? fromYear : `${fromYear} - ${toYear}`}{" "}
      <span className="font-semibold text-blue-700 dark:text-blue-300 hover:underline cursor-pointer transition-all duration-300">
        {myCopyright}
      </span>
      {". "}
      {copyrightDescription}
    </>
  );

  const containerClass =
    "flex items-center justify-center px-4 py-6 bg-gray-100 dark:bg-gray-700";
  const contentClass =
    "w-full sm:w-[90%] md:w-[80%] lg:w-[60%] text-center text-gray-600 dark:text-gray-400 text-sm";

  return (
    <footer className={containerClass}>
      <div className={contentClass}>
        <div>{footerText}</div>
      </div>
    </footer>
  );
};

export default Footer;
