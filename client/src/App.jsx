import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import NotificationDisplay from "./components/NotificationDisplay";
import { NotificationProvider } from "./context/NotificationContext.jsx";

function App() {
  return (
    <NotificationProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
        <NotificationDisplay />
        <main className="flex-grow bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
          <div className="container mx-auto px-6 sm:px-10 py-8">
            <ToastContainer theme="colored" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </NotificationProvider>
  );
}

export default App;
