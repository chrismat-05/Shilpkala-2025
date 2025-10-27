import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-transparent flex flex-col items-center justify-center px-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl sm:text-4xl font-bold text-foreground mb-12 tracking-tight text-center drop-shadow-lg font-pirata"
      >
        Shilpkala 2025 Admin Dashboard
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-6 w-full max-w-xs sm:max-w-md justify-center"
      >
        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex-1 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border border-border"
        >
          Linktree
        </motion.button>
        <motion.button
          onClick={() => navigate("/tech")}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex-1 px-8 py-4 rounded-xl bg-card text-foreground font-semibold text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border border-border"
        >
          Backdrops
        </motion.button>
        <motion.button
          onClick={() => window.location.href = "/volunteers"}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex-1 px-8 py-4 rounded-xl bg-card text-foreground font-semibold text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border border-border"
        >
          Volunteer's OD Form
        </motion.button>
        <motion.button
          onClick={() => navigate("/registrations")}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex-1 px-8 py-4 rounded-xl bg-card text-foreground font-semibold text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border border-border"
        >
          Registrations
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Home;
