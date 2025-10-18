import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Registrations from "./pages/Registrations";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Instagram } from "lucide-react";
import { SpeedInsights } from "@vercel/speed-insights/react"; // React entrypoint for non-Next apps
import { Analytics } from "@vercel/analytics/react"; // React entrypoint for non-Next apps

const queryClient = new QueryClient();

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (isHome) {
    return (
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-card/80 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-md backdrop-blur flex items-center gap-2"
        >
          Follow us
          <motion.a
            href="https://www.instagram.com/kristujayanti_fineartsclub/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-primary hover:text-primary-hover"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Instagram className="inline h-5 w-5 align-text-bottom" />
          </motion.a>
        </motion.div>
      </motion.footer>
    );
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-card/80 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-md backdrop-blur"
      >
        Built by{" "}
        <a
          href="https://thecma.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary-hover font-semibold"
        >
          CMA
        </a>
      </motion.div>
    </motion.footer>
  );
};

const RouterContent = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SpeedInsights />
        <Analytics />
        <BrowserRouter>
          <div className="min-h-screen bg-transparent">
            <RouterContent />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
