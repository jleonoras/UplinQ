import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

// This component displays a global notification banner at the top of the screen.
const NotificationDisplay = () => {
  // It subscribes to the global notification state from our context.
  const { notification } = useNotification();

  // It dynamically determines the style and icon based on the notification type.
  const isError = notification?.type === "error";
  const bgColor = isError ? "bg-red-500" : "bg-green-500";
  const Icon = isError ? AlertTriangle : CheckCircle;

  return (
    // AnimatePresence handles the enter and exit animations gracefully.
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          // These classes make the banner responsive and styled.
          className={`fixed top-5 left-1/2 z-50 w-11/12 max-w-md -translate-x-1/2 flex items-center gap-3 rounded-lg p-4 text-white shadow-lg ${bgColor}`}
        >
          <Icon className="w-6 h-6 flex-shrink-0" />
          {/*
            The clamp() function has been updated for better scaling on wider devices like foldables.
            - The minimum size is still 0.75rem (12px).
            - The preferred size now scales more aggressively with viewport width (2vw).
            - The maximum size is increased slightly to 0.95rem (~15px) to fill space better.
          */}
          <span
            className="font-semibold whitespace-nowrap"
            style={{ fontSize: "clamp(0.75rem, 0.4rem + 2vw, 0.95rem)" }}
          >
            {notification.message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDisplay;
