import React from "react";

type ShilpkalaLoaderProps = {
  loops?: number;
  loopMs?: number;
};

const ShilpkalaLoader: React.FC<ShilpkalaLoaderProps> = ({ loops, loopMs = 1500 }) => {
  const loopCountRef = React.useRef<number>(loops && loops > 0 ? loops : Math.floor(Math.random() * 4) + 1);

  const iter = loopCountRef.current;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/30 backdrop-blur-sm">
      <svg
        width="420"
        height="100"
        viewBox="0 0 420 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
        style={{ maxWidth: "90vw" }}
      >
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Montserrat', 'Segoe UI', Arial, sans-serif"
          fontWeight="bold"
          fontSize="48"
          stroke="hsl(0,0%,95%)"
          strokeWidth="2.5"
          fill="none"
          className="animate-stroke"
          style={{
            animationDuration: `${loopMs}ms`,
            animationIterationCount: iter,
            animationTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          Shilpkala 2025
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Montserrat', 'Segoe UI', Arial, sans-serif"
          fontWeight="bold"
          fontSize="48"
          fill="hsl(0,0%,20%)"
          opacity="0.15"
        >
          Shilpkala 2025
        </text>
      </svg>
      <style>{`
        .animate-stroke {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation-name: outline-draw;
          animation-fill-mode: forwards;
        }
        @keyframes outline-draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ShilpkalaLoader;