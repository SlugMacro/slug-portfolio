import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function RootLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen max-w-[1800px] border-r border-border bg-bg">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
          <Footer />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
