import { motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import BrochureCard from "@/components/BrochureCard";
import EventCarousel from "@/components/EventCarousel";
import React from "react";

import eventsData from "@/data/events.json";
import { resolveImage } from "@/lib/images";

const participantsIncludes = (evt: any, kind: string) => {
  if (!evt?.participants) return false;
  return evt.participants
    .split(",")
    .map((s: string) => s.trim().toLowerCase())
    .includes(kind.toLowerCase());
};

const Index = () => {
  const brochure = eventsData.find((e) => e.type === "brochure");
  const events = eventsData.filter((e) => e.type === "event");

  const soloEvents = events.filter((e) => participantsIncludes(e, "solo"));
  const duoEvents = events.filter((e) => participantsIncludes(e, "duo"));
  const trioEvents = events.filter((e) => participantsIncludes(e, "trio"));

  const bgCoverUrl = resolveImage("bgcover.png");

  return (
    <div className="min-h-screen py-12 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="font-pirata text-2xl font-bold tracking-tight flex-1">
            Shilpkala 2025
          </h1>
        </div>

        {brochure && (
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-8"
          >
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
        <div
          className="mb-8 rounded-lg overflow-hidden shadow-card"
          style={{
            backgroundImage: `url('${bgCoverUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-3 md:p-4">
            <h2 className="font-pirata text-[#9f694a]/80 text-5xl md:text-6xl mb-3">
              Solo Events
            </h2>
            <EventCarousel events={soloEvents} autoplayMs={4000} />
          </div>
        </div>

        {/* Duo events group */}
        <div
          className="mb-8 rounded-lg overflow-hidden shadow-card"
          style={{
            backgroundImage: `url('${bgCoverUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-3 md:p-4">
            <h2 className="font-pirata text-[#9f694a]/80 text-5xl md:text-6xl mb-3">
              Duo Events
            </h2>
            <EventCarousel events={duoEvents} autoplayMs={4200} />
          </div>
        </div>

        {/* Trio events group */}
        <div
          className="mb-8 rounded-lg overflow-hidden shadow-card"
          style={{
            backgroundImage: `url('${bgCoverUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-4 md:p-6">
            <h2 className="font-pirata text-[#9f694a]/80 text-5xl md:text-6xl mb-3">
              Trio Events
            </h2>
            {trioEvents.length === 1 ? (
              <div className="flex justify-center">
                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
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
        </div>
      </div>
    </div>
  );
};

export default Index;