import React from "react";
import { useNavigate } from "react-router-dom";
const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 tracking-tight text-center drop-shadow-lg">
        Shilpkala 2025 Dashboard
      </h1>
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xs sm:max-w-md justify-center">
        <button
          onClick={() => navigate("/")}
          className="flex-1 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg transition-all duration-200 hover:bg-primary/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border border-border"
        >
          Linktree
        </button>
        <button
          onClick={() => navigate("/registrations")}
          className="flex-1 px-8 py-4 rounded-xl bg-card text-foreground font-semibold text-lg shadow-lg transition-all duration-200 hover:bg-card-hover hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border border-border"
        >
          Registrations
        </button>
      </div>
    </div>
  );
};

export default Home;
