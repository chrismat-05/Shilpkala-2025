import React from "react";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import eventsData from "@/data/events.json";
import { getEventStatus, TITLE_ALIASES } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface TechEvent {
  title: string;
  link: string;
}

const techEvents: TechEvent[] = [
  {
    title: "Scrapbook Project",
    link: "https://www.canva.com/design/DAG29IaXEJA/Ci52D-zh04jPq-YaSuzGWQ/view?utm_content=DAG29IaXEJA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4cd8c2e176"
  },
  {
    title: "Echoes of Pencil",
    link: "https://www.canva.com/design/DAG29KuJ_8o/asj-KDp1rq5TJHXQmW7OTQ/view?utm_content=DAG29KuJ_8o&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h018f2ec069"
  },
  {
    title: "Doodle Dash",
    link: "https://www.canva.com/design/DAG29Y6wttA/1HNqg7_WjETPj7pWEFZYNA/view?utm_content=DAG29Y6wttA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h6fa9401409"
  },
  {
    title: "Paper Palette",
    link: "https://www.canva.com/design/DAG29cTzGhs/4d8KYAC5gJQqeIwwBJ5HNg/view?utm_content=DAG29cTzGhs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he54a8b5743"
  },
  {
    title: "Face Splash Attack",
    link: "https://www.canva.com/design/DAG29c7cWQM/COWnZVshu3Dhqn63VSzEDA/view?utm_content=DAG29c7cWQM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h065997599f"
  },
  {
    title: "Toon Town",
    link: "https://www.canva.com/design/DAG29VIMxpc/0sniG4yI2bRb03k0NdyQQw/view?utm_content=DAG29VIMxpc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h8b4505e0e4"
  },
  {
    title: "Mosaic of Moment",
    link: "https://www.canva.com/design/DAG29tHfYF0/qd3gdkNw2CNEoLfghXxerw/view?utm_content=DAG29tHfYF0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0cdac62686"
  },
  {
    title: "Chain Reaction",
    link: "https://www.canva.com/design/DAG29q0QZjY/8zP-h4-v4Dbk7-7qIxEWTw/view?utm_content=DAG29q0QZjY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he8008b9bf5"
  },
  {
    title: "Henna Tales",
    link: "https://www.canva.com/design/DAG29reqRWk/mqy_FHV6gaySkvt3Q4DWnA/view?utm_content=DAG29reqRWk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h01b9d4c51b"
  },
  {
    title: "Shilpkala Showcase",
    link: "https://www.canva.com/design/DAG29gNAbS8/REkWL_wgYyjRavgQPUqbew/view?utm_content=DAG29gNAbS8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h12dff7d74d"
  }
];

const Tech: React.FC = () => {
  const navigate = useNavigate();

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
          {techEvents.map((event, index) => {
            const lookupTitle = TITLE_ALIASES[event.title] ?? event.title;
            const meta = eventsData.find((e) => e.type === "event" && e.title === lookupTitle) as { startAt?: string; endAt?: string } | undefined;
            const { isHappeningNow, isStartingSoon } = getEventStatus({ startAt: meta?.startAt, endAt: meta?.endAt });
            return (
            <motion.div
              key={event.title}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              className="bg-card/80 border border-border rounded-lg shadow-card overflow-hidden flex flex-col relative"
            >
              {(isHappeningNow || isStartingSoon) && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute top-2 right-2 z-10 text-xs font-semibold px-2 py-0.5 rounded shadow select-none ${
                    isHappeningNow ? "bg-green-600 text-white" : "bg-amber-500 text-black"
                  }`}
                >
                  {isHappeningNow ? "Happening now" : "Starting soon"}
                </motion.span>
              )}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <h3 className="font-freckle font-semibold text-foreground text-lg">
                  {event.title}
                </h3>
                <motion.a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <span>Backdrop Links</span>
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

export default Tech;
