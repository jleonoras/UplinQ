import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const NotificationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  // State holds an object with message and type
  const [notification, setNotification] = useState(null);

  /**
   * Displays a notification message.
   * @param {string} message The message to display.
   * @param {'success' | 'error'} type The type of notification.
   * @param {number} [duration=4000] The duration in milliseconds.
   */
  const showNotification = (message, type = "error", duration = 4000) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  const value = { notification, showNotification };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
