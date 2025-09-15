import { Outlet } from "react-router-dom";
import Header from "./Header";
import { motion } from "framer-motion";
import Chatbot from "../chatbot/Chatbot";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Outlet />
      </motion.main>
      <Chatbot />
    </div>
  );
};

export default Layout;
