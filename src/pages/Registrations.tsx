import eventsData from "@/data/events.json";
import { resolveImage } from "@/lib/images";
import axios from "axios";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import React from "react";
import { useIsFetching } from "@tanstack/react-query";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import ShilpkalaLoader from "@/components/ShilpkalaLoader";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart2, GraduationCap, Sparkles, User2 } from "lucide-react";
import { getRegistrationStats } from "@/lib/utils";

type CountsMap = Record<string, {
  firstYear: number;
  secondYear: number;
  thirdYear: number;
  total: number;
}>;

const fetchCounts = async (): Promise<CountsMap> => {
  const baseUrl = import.meta.env.VITE_REG_COUNT as string;
  if (!baseUrl) return {} as CountsMap;
  const url = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}t=${Date.now()}`;
  const res = await axios.get(url, { headers: { Accept: "application/json" } });
  return (res.data ?? {}) as CountsMap;
};

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

// Map UI titles to API keys when they differ in casing/spelling
const TITLE_ALIASES: Record<string, string> = {
  // UI shows "Echoes Of Pencil" but API returns "Echoes of Pencil"
  "Echoes Of Pencil": "Echoes of Pencil",
};

const Registrations: React.FC = () => {
  const [open, setOpen] = React.useState<{ [event: string]: boolean }>({});
  const [lastRefresh, setLastRefresh] = React.useState<Date>(new Date());
  const { data: counts = {} as CountsMap, isLoading, isError, refetch, isFetching } = useAutoRefresh<CountsMap>(
    ["reg-counts"],
    async () => {
      const data = await fetchCounts();
      setLastRefresh(new Date());
      return data;
    },
    30000
  );

  const navigate = useNavigate();

  if (isLoading) return <ShilpkalaLoader loops="infinite" overlay="dim" />;
  if (isError) return <div className="min-h-screen flex items-center justify-center bg-gradient-bg text-destructive">Failed to fetch registration data</div>;

  const stats = getRegistrationStats(counts as Record<string, { firstYear: number; secondYear: number; thirdYear: number; total: number }>);

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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Event Registrations</h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            className="flex items-center gap-4 bg-card/80 border border-border rounded-lg shadow-card p-5"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-primary/10 rounded-full p-3"
            >
              <BarChart2 className="w-7 h-7 text-primary" />
            </motion.div>
            <div>
              <div className="text-lg font-bold text-foreground">{stats.total}</div>
              <div className="text-xs text-muted-foreground font-medium">Total</div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            className="flex items-center gap-4 bg-card/80 border border-border rounded-lg shadow-card p-5"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-primary/10 rounded-full p-3"
            >
              <Sparkles className="w-7 h-7 text-primary" />
            </motion.div>
            <div>
              <div className="text-lg font-bold text-foreground">{stats.firstYear}</div>
              <div className="text-xs text-muted-foreground font-medium">1st Year</div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            className="flex items-center gap-4 bg-card/80 border border-border rounded-lg shadow-card p-5"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-primary/10 rounded-full p-3"
            >
              <User2 className="w-7 h-7 text-primary" />
            </motion.div>
            <div>
              <div className="text-lg font-bold text-foreground">{stats.secondYear}</div>
              <div className="text-xs text-muted-foreground font-medium">2nd Year</div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            className="flex items-center gap-4 bg-card/80 border border-border rounded-lg shadow-card p-5"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-primary/10 rounded-full p-3"
            >
              <GraduationCap className="w-7 h-7 text-primary" />
            </motion.div>
            <div>
              <div className="text-lg font-bold text-foreground">{stats.thirdYear}</div>
              <div className="text-xs text-muted-foreground font-medium">3rd Year</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {eventsData.filter(e => e.type === "event").map((event) => {
            const key = TITLE_ALIASES[event.title] ?? event.title;
            const reg = counts[key] || { firstYear: 0, secondYear: 0, thirdYear: 0, total: 0 };
            return (
              <motion.div
                key={event.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                className="bg-card/80 border border-border rounded-lg shadow-card overflow-hidden flex flex-col"
              >
                {event.image && (
                  <motion.div
                    className="aspect-video w-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={resolveImage(event.image)} alt={event.title} className="w-full h-full object-cover" />
                  </motion.div>
                )}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-freckle font-semibold text-foreground">{event.title}</span>
                  <motion.button
                    className="flex items-center gap-1 text-primary hover:text-primary-hover font-semibold focus:outline-none"
                    onClick={() => setOpen((o) => ({ ...o, [event.title]: !o[event.title] }))}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-expanded={!!open[event.title]}
                    aria-controls={`dropdown-${event.title}`}
                  >
                    <span>{reg.total}</span>
                    <motion.svg
                      animate={{ rotate: open[event.title] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </motion.button>
                </div>
                {open[event.title] && (
                  <AnimatePresence>
                    <motion.div
                      id={`dropdown-${event.title}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-4 text-sm"
                    >
                      <div className="flex justify-between py-1"><span>First Year</span><span>{reg.firstYear}</span></div>
                      <div className="flex justify-between py-1"><span>Second Year</span><span>{reg.secondYear}</span></div>
                      <div className="flex justify-between py-1"><span>Third Year</span><span>{reg.thirdYear}</span></div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
           {isFetching ? (
             <motion.div
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="flex items-center gap-2 bg-card/80 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-md backdrop-blur"
             >
               <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
               </svg>
               <span>Refreshing...</span>
             </motion.div>
           ) : (
             <div className="flex items-center bg-card/80 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-md backdrop-blur">
               <span>Automatically refreshes every 30 sec. &nbsp;|&nbsp; Last refreshed at {lastRefresh.toLocaleTimeString()}</span>
             </div>
           )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Registrations;
