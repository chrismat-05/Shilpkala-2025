import React from "react";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import eventsData from "@/data/events.json";
import { getEventStatus } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

type DataEvent = { type: string; title: string; backdropLink?: string; startAt?: string; endAt?: string; venue?: string };
const backdropEvents: DataEvent[] = (eventsData as DataEvent[]).filter((e) => e.type === "event" && !!e.backdropLink);

const backdrop: React.FC = () => {
  const navigate = useNavigate();
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const t = window.setInterval(() => setTick((v) => v + 1), 30000);
    return () => window.clearInterval(t);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASE },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen py-12 px-6 relative"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-8"
        >
          <motion.button
            onClick={() => navigate("/home")}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-card-hover focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </motion.button>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Event Backdrops</h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {backdropEvents.map((event, index) => {
            const { isHappeningNow, isStartingSoon, isOver } = getEventStatus({ startAt: event.startAt, endAt: event.endAt });
            const fmtRange = (s?: string, e?: string) => {
              if (!s || !e) return "";
              const ds = new Date(s), de = new Date(e);
              const dateFmt = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
              const timeFmt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
              const sameDay = ds.toDateString() === de.toDateString();
              if (sameDay) {
                return `${dateFmt.format(ds)}, ${timeFmt.format(ds)} – ${timeFmt.format(de)}`;
              }
              return `${dateFmt.format(ds)}, ${timeFmt.format(ds)} – ${dateFmt.format(de)}, ${timeFmt.format(de)}`;
            };
            return (
            <motion.div
              key={event.title}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              className="bg-card/80 border border-border rounded-lg shadow-card overflow-hidden flex flex-col relative"
            >
              {(isHappeningNow || isStartingSoon || isOver) && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute top-2 right-2 z-10 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded shadow select-none ${
                    isOver ? "bg-destructive text-destructive-foreground" : isHappeningNow ? "bg-green-600 text-white" : "bg-amber-500 text-black"
                  }`}
                >
                  {isOver ? "Event over" : isHappeningNow ? "Happening now" : "Starting soon"}
                </motion.span>
              )}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <h3 className="font-freckle font-semibold text-foreground text-lg">
                  {event.title}
                </h3>
                {(event?.startAt && event?.endAt) || event?.venue ? (
                  <div className="w-full flex flex-col items-center justify-center text-white text-xs sm:text-sm gap-1 px-1 py-0.5 font-medium text-center">
                    {(event?.startAt && event?.endAt) ? (
                      <span className="leading-tight">{fmtRange(event?.startAt, event?.endAt)}</span>
                    ) : null}
                    {event?.venue ? (
                      <span className="leading-tight break-words" title={event?.venue}>{event?.venue}</span>
                    ) : null}
                  </div>
                ) : null}
                <motion.a
                  href={(event as any).backdropLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <span>Backdrop Link</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          )})}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default backdrop;
