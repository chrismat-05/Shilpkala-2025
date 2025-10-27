import React from "react";
import { motion } from "framer-motion";
import { getEventStatus, isRegistrationOpen, type EventSchedule } from "@/lib/utils";

type EventCardProps = {
  title: string;
  imageUrl?: string;
  buttonText?: string;
  link?: string;
  delay?: number;
  disabled?: boolean;
  description?: string;
  startAt?: string;
  endAt?: string;
  venue?: string;
};

const EventCard: React.FC<EventCardProps> = ({
  title,
  imageUrl,
  buttonText,
  link,
  delay = 0,
  disabled = false,
  description,
  startAt,
  endAt,
  venue,
}) => {
  const hoverVariants = {
    enabled: { scale: 1.03, y: -5 },
    disabled: {},
  };

  const schedule: EventSchedule = { startAt, endAt };
  const [now, setNow] = React.useState<Date>(new Date());
  React.useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 30000); // refresh every 30s
    return () => window.clearInterval(t);
  }, []);

  const { isHappeningNow, isStartingSoon, isOver } = getEventStatus(schedule, now);
  const computedDisabled = disabled ?? false;
  const autoDisabled = !isRegistrationOpen(!computedDisabled, schedule, now);
  const finalDisabled = computedDisabled || autoDisabled;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverVariants[disabled ? "disabled" : "enabled"]}
      transition={{ duration: 0.3, delay }}
      className={`bg-[#ebebe1] border border-border rounded-lg overflow-hidden shadow-card group ${disabled ? "opacity-60 grayscale" : "hover:shadow-card-hover"}`}
      style={{ position: "relative" }}
    >
      {(finalDisabled || isHappeningNow || isStartingSoon) && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
          className={`absolute top-2 right-2 z-10 text-xs font-semibold px-2 py-0.5 rounded shadow select-none ${
            finalDisabled ? "bg-destructive text-destructive-foreground" : isHappeningNow ? "bg-green-600 text-white" : "bg-amber-500 text-black"
          }`}
        >
          {finalDisabled ? (isOver ? "Event over" : "Registration closed") : isHappeningNow ? "Happening now" : "Starting soon"}
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

      <div className="p-3 sm:p-4 flex flex-col items-center">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
          className="text-sm sm:text-base font-semibold text-[#9f694a] mb-2 sm:mb-4"
        >
          <span className="font-freckle leading-tight">{title}</span>
        </motion.h3>

        {venue && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.15 }}
            className="text-[11px] sm:text-xs text-muted-foreground mb-1 text-center w-full font-titl"
            aria-label={`Venue: ${venue}`}
          >
            Venue: {venue}
          </motion.div>
        )}

        {description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
            className="text-xs sm:text-sm text-muted-foreground mb-2 text-center w-full font-titl"
          >
            {description}
          </motion.div>
        )}

        {finalDisabled ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.3 }}
            className="w-full px-3 py-2 rounded bg-muted text-muted-foreground font-semibold cursor-not-allowed opacity-80 mt-2 text-center select-none font-titl"
          >
            {isOver ? "Event over" : buttonText}
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
            className="w-full px-3 py-2 rounded bg-primary font-semibold shadow hover:bg-primary/90 mt-2 text-center block font-tilt text-[#9f694a]/90"
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