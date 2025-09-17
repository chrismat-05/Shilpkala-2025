import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Registrations from "./pages/Registrations";
import Home from "./pages/Home";
import { useLocation } from "react-router-dom";
import { Instagram } from "lucide-react";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  if (isHome) {
    return (
      <footer className="fixed bottom-4 right-4 z-50">
        {/*<div className="bg-card/80 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-md backdrop-blur flex items-center gap-2">
          Follow us
          <a
            href="https://instagram.com/shilpkala"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-primary hover:text-primary-hover"
          >
            <Instagram className="inline h-5 w-5 align-text-bottom" />
          </a>
        </div>*/}
      </footer>
    );
  }
  return (
    <footer className="fixed bottom-4 right-4 z-50">
      <div className="bg-card/80 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-md backdrop-blur">
        Built by{' '}
        <a
          href="https://thecma.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary-hover font-semibold"
        >
          CMA
        </a>
      </div>
    </footer>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-bg relative">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registrations" element={<Registrations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;