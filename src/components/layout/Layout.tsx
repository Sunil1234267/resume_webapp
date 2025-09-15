import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "../chatbot/Chatbot"; // Import the Chatbot component

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <Chatbot /> {/* Add the Chatbot component here */}
    </div>
  );
};

export default Layout;
