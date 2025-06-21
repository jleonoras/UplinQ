import PropTypes from "prop-types";
import { X, Copy, Share2 } from "lucide-react";

// A modal component with an updated, uniform design.
const HowToModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // The overlay uses a slightly more subtle blur effect.
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-6 mx-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside it
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          How to Share Your File Publicly
        </h3>
        <div className="mt-5 space-y-5 text-gray-600 dark:text-gray-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
              <Share2 className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                Step 1: Open Share Settings
              </h4>
              <p className="text-sm">
                In Google Drive, open the file and click the blue "Share" button
                in the top-right corner.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
              <Copy className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                Step 2: Copy the Public Link
              </h4>
              <p className="text-sm">
                Under "General access", click the dropdown and select "Anyone
                with the link", then click "Copy link".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes ensure the component receives the correct data types.
HowToModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HowToModal;
