// src/components/Navbar.tsx
"use client";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-blue-600 text-white shadow-md sticky top-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🔍 ProductFinder</h1>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Made with 💙 by Malahima</span>
          <FaShoppingCart className="text-xl" />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
