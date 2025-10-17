import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-card/80 border border-border rounded-xl shadow-card p-8 max-w-md w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl font-bold text-destructive">404</span>
          <span className="text-lg font-semibold text-foreground">Page Not Found</span>
          <span className="text-sm text-muted-foreground mb-4 text-center">Sorry, the page you are looking for does not exist or has been moved.</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 rounded bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;