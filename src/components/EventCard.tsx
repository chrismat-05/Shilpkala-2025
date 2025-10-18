import React from "react";
import { motion } from "framer-motion";

type EventCardProps = {
  title: string;
  imageUrl?: string;
  buttonText?: string;
  link?: string;
  delay?: number;
  disabled?: boolean;
  description?: string;
};

const EventCard: React.FC<EventCardProps> = ({
  title,
  imageUrl,
  buttonText,
  link,
  delay = 0,
  disabled = false,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`bg-[#ebebe1] border border-border rounded-lg overflow-hidden shadow-card transition-all duration-300 group ${disabled ? "opacity-60 grayscale" : "hover:shadow-card-hover"}`}
      style={{ position: "relative" }}
    >
      {disabled && (
        <span className="absolute top-2 right-2 z-10 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-0.5 rounded shadow select-none">
          Registration closed
        </span>
      )}

      {imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-4 sm:p-6 flex flex-col items-center">
        <h3 className="text-base sm:text-lg font-freckle font-semibold text-[#9f694a] mb-2 sm:mb-4">
          {title}
        </h3>

        {description && <div className="text-sm text-muted-foreground mb-2 text-center w-full font-titl">{description}</div>}

        {disabled ? (
          <div className="w-full px-4 py-2 rounded bg-muted text-muted-foreground font-semibold cursor-not-allowed opacity-80 mt-2 text-center select-none font-titl">
            {buttonText}
          </div>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 rounded bg-primary font-semibold shadow hover:bg-primary/90 transition mt-2 text-center block font-tilt text-[#9f694a]/90"
            tabIndex={0}
          >
            {buttonText}
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;