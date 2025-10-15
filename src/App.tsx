import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Registrations from "./pages/Registrations";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Instagram } from "lucide-react";
import ShilpkalaLoader from "./components/ShilpkalaLoader";

const queryClient = new QueryClient();

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  if (isHome) {
    return (
      <footer className="fixed bottom-4 right-4 z-50">
        <div className="bg-card/80 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-md backdrop-blur flex items-center gap-2">
          Follow us
          <a
            href="https://www.instagram.com/kristujayanti_fineartsclub/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-primary hover:text-primary-hover"
          >
            <Instagram className="inline h-5 w-5 align-text-bottom" />
          </a>
        </div>
      </footer>
    );
  }
  return (
    <footer className="fixed bottom-4 right-4 z-50">
      <div className="bg-card/80 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-md backdrop-blur">
        Built by{" "}
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

const RouterContent = () => {
  const location = useLocation();
  const [routeLoading, setRouteLoading] = React.useState(false);
  const [loaderLoops, setLoaderLoops] = React.useState<number>(1);
  const indexShownRef = React.useRef(false);

  React.useEffect(() => {
    const isIndex = location.pathname === "/";
    const shownKey = "shilpkala_loader_shown_index";

    if (isIndex) {
      if (indexShownRef.current) return;
      if (typeof window !== "undefined" && sessionStorage.getItem(shownKey)) {
        indexShownRef.current = true;
        return;
      }
    }

    const loops = isIndex ? 1 : Math.floor(Math.random() * 4) + 1;
    indexShownRef.current = indexShownRef.current || isIndex;

    setLoaderLoops(loops);
    setRouteLoading(true);
    const perLoopMs = 1500;
    const timeout = setTimeout(() => {
      setRouteLoading(false);
      if (isIndex && typeof window !== "undefined") {
        try {
          sessionStorage.setItem(shownKey, "1");
        } catch {
        }
      }
    }, loops * perLoopMs + 300);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {routeLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-bg">
          <ShilpkalaLoader loops={loaderLoops} />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registrations" element={<Registrations />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-bg relative">
          <RouterContent />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;