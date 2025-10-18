import { motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import BrochureCard from "@/components/BrochureCard";
import EventCarousel from "@/components/EventCarousel";
import React from "react";
import ShilpkalaLoader from "@/components/ShilpkalaLoader";

import eventsData from "@/data/events.json";
import { resolveImage } from "@/lib/images";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]; // easeOut

const participantsIncludes = (evt: any, kind: string) => {
  if (!evt?.participants) return false;
  return evt.participants
    .split(",")
    .map((s: string) => s.trim().toLowerCase())
    .includes(kind.toLowerCase());
};

const Index = () => {
  const INTRO_LOOPS = 1;
  const INTRO_LOOP_MS = 1500;
  const [showIntro, setShowIntro] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), INTRO_LOOPS * INTRO_LOOP_MS + 200);
    return () => clearTimeout(t);
  }, []);

  const brochure = eventsData.find((e) => e.type === "brochure");
  const events = eventsData.filter((e) => e.type === "event");

  const soloEvents = events.filter((e) => participantsIncludes(e, "solo"));
  const duoEvents = events.filter((e) => participantsIncludes(e, "duo"));
  const trioEvents = events.filter((e) => participantsIncludes(e, "trio"));

  const bgCoverUrl = resolveImage("bgcover.png");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASE,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="min-h-screen py-12 px-6 bg-transparent"
    >
      {showIntro && <ShilpkalaLoader loops={INTRO_LOOPS} loopMs={INTRO_LOOP_MS} overlay="dark" />}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={showIntro ? "hidden" : "visible"}
        className={`max-w-6xl mx-auto transition-opacity duration-300 ${showIntro ? "opacity-0 pointer-events-none select-none" : "opacity-100"}`}
        aria-busy={showIntro}
      >
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
          <h1 className="font-pirata text-5xl md:text-5xl font-bold tracking-tight flex-1 leading-none">
            Shilpkala 2025
          </h1>
        </motion.div>

        {brochure && (
          <motion.section variants={itemVariants} className="mb-8">
            <div
              className="rounded-lg overflow-hidden shadow-lg"
              style={{
                backgroundImage: ` url('${bgCoverUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="p-4 md:p-6">
                <BrochureCard
                  title={brochure.title}
                  imageUrl={resolveImage(brochure.image)}
                  description={brochure.desc}
                  buttonText="View Brochure"
                  link={brochure.link}
                  disabled={!brochure.isOpen}
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* Solo events group */}
        <motion.div
          variants={itemVariants}
          className="mb-8 rounded-lg overflow-hidden shadow-card"
          style={{
            backgroundImage: `url('${bgCoverUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-3 md:p-4">
            <h2 className="font-pirata heading-cutout text-5xl md:text-6xl mb-3">
              Solo Events
            </h2>
            <EventCarousel events={soloEvents} autoplayMs={4000} />
          </div>
        </motion.div>

        {/* Duo events group */}
        <motion.div
          variants={itemVariants}
          className="mb-8 rounded-lg overflow-hidden shadow-card"
          style={{
            backgroundImage: `url('${bgCoverUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-3 md:p-4">
            <h2 className="font-pirata heading-cutout text-5xl md:text-6xl mb-3">
              Duo Events
            </h2>
            <EventCarousel events={duoEvents} autoplayMs={4200} />
          </div>
        </motion.div>

        {/* Trio events group */}
        <motion.div
          variants={itemVariants}
          className="mb-8 rounded-lg overflow-hidden shadow-card"
          style={{
            backgroundImage: `url('${bgCoverUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-3 md:p-4">
            <h2 className="font-pirata heading-cutout text-5xl md:text-6xl mb-3">
              Trio Events
            </h2>
            {trioEvents.length === 1 ? (
              <div className="flex justify-center">
                <div className="w-[92%] sm:w-[76%] md:w-[48%] lg:w-[44%] px-4 scale-105 transition-transform duration-700 ease-in-out">
                  <EventCard
                    title={trioEvents[0].title}
                    imageUrl={resolveImage(trioEvents[0].image)}
                    description={trioEvents[0].desc}
                    buttonText={trioEvents[0].isOpen ? "Register Now" : "Registration closed"}
                    link={trioEvents[0].link}
                    disabled={!trioEvents[0].isOpen}
                  />
                </div>
              </div>
            ) : (
              <EventCarousel events={trioEvents} autoplayMs={4400} />
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Index;