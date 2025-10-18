import React from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  imageUrl?: string;
  link?: string;
  buttonText?: string;
  description?: string;
  disabled?: boolean;
};

const BrochureCard: React.FC<Props> = ({ title, imageUrl, link, buttonText = "View", description, disabled }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#ebebe1] border border-border rounded-lg overflow-hidden shadow-card flex flex-col md:flex-row items-stretch ${
        disabled ? "opacity-60 grayscale" : ""
      }`}
      role="region"
      aria-label={title}
    >
      {imageUrl && (
        <motion.div
          className="md:w-1/2 w-full h-56 md:h-auto overflow-hidden flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </motion.div>
      )}

      <div className="p-6 md:w-1/2 flex flex-col justify-center gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-2xl md:text-3xl font-freckle font-semibold text-[#9f694a] leading-tight"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm text-[#9f694a]/80"
            style={{ fontFamily: "Poppins, system-ui, -apple-system" }}
          >
            {description}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-2"
        >
          {disabled ? (
            <div className="inline-block px-5 py-2 rounded bg-muted text-muted-foreground font-semibold select-none font-tilt">
              {buttonText}
            </div>
          ) : (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-block px-5 py-2 rounded bg-primary font-semibold shadow hover:bg-primary/90 transition font-tilt text-[#9f694a]/90"
            >
              {buttonText}
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BrochureCard;