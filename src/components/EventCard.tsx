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
  const hoverVariants = {
    enabled: { scale: 1.03, y: -5 },
    disabled: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverVariants[disabled ? "disabled" : "enabled"]}
      transition={{ duration: 0.3, delay }}
      className={`bg-[#ebebe1] border border-border rounded-lg overflow-hidden shadow-card group ${disabled ? "opacity-60 grayscale" : "hover:shadow-card-hover"}`}
      style={{ position: "relative" }}
    >
      {disabled && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
          className="absolute top-2 right-2 z-10 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-0.5 rounded shadow select-none"
        >
          Registration closed
        </motion.span>
      )}

      {imageUrl && (
        <motion.div
          className="aspect-video overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      <div className="p-4 sm:p-6 flex flex-col items-center">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
          className="text-base sm:text-lg font-freckle font-semibold text-[#9f694a] mb-2 sm:mb-4"
        >
          {title}
        </motion.h3>

        {description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
            className="text-sm text-muted-foreground mb-2 text-center w-full font-titl"
          >
            {description}
          </motion.div>
        )}

        {disabled ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.3 }}
            className="w-full px-4 py-2 rounded bg-muted text-muted-foreground font-semibold cursor-not-allowed opacity-80 mt-2 text-center select-none font-titl"
          >
            {buttonText}
          </motion.div>
        ) : (
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -2, transition: { type: "spring", stiffness: 400, damping: 10 } }}
            whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 10 } }}
            transition={{ duration: 0.3, delay: delay + 0.3 }}
            className="w-full px-4 py-2 rounded bg-primary font-semibold shadow hover:bg-primary/90 mt-2 text-center block font-tilt text-[#9f694a]/90"
            tabIndex={0}
          >
            {buttonText}
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;