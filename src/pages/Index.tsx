import { motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import BrochureCard from "@/components/BrochureCard";
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

  const bgCoverUrl = resolveImage("bgcover.png"); // expects bgcover.png in public or images map

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="font-pirata text-2xl font-bold tracking-tight flex-1">
            Shilpkala 2025
          </h1>
        </div>

        {/* Brochure card inside a bgcover card */}
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
                backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${bgCoverUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="p-8 md:p-12">
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
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div
            className="rounded-lg overflow-hidden shadow-card p-6"
            style={{
              backgroundImage: `url('${bgCoverUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold font-pirata">Solo Events</h2>
              <div className="text-sm text-muted-foreground">
                {soloEvents.length} events
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {soloEvents.map((event, index) => (
                <EventCard
                  key={`${event.title}-solo`}
                  title={event.title}
                  imageUrl={resolveImage(event.image)}
                  buttonText={
                    event.isOpen ? "Register Now" : "Registration closed"
                  }
                  link={event.link}
                  delay={0.05 * index}
                  disabled={!event.isOpen}
                  description={event.desc}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Duo events group */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div
            className="rounded-lg overflow-hidden shadow-card p-6"
            style={{
              backgroundImage: `url('${bgCoverUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold font-pirata">Duo Events</h2>
              <div className="text-sm text-muted-foreground">
                {duoEvents.length} events
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {duoEvents.map((event, index) => (
                <EventCard
                  key={`${event.title}-duo`}
                  title={event.title}
                  imageUrl={resolveImage(event.image)}
                  buttonText={
                    event.isOpen ? "Register Now" : "Registration closed"
                  }
                  link={event.link}
                  delay={0.05 * index}
                  disabled={!event.isOpen}
                  description={event.desc}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Trio events group */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div
            className="rounded-lg overflow-hidden shadow-card p-6"
            style={{
              backgroundImage: `url('${bgCoverUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold font-pirata">Trio Events</h2>
              <div className="text-sm text-muted-foreground">
                {trioEvents.length} events
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trioEvents.map((event, index) => (
                <EventCard
                  key={`${event.title}-trio`}
                  title={event.title}
                  imageUrl={resolveImage(event.image)}
                  buttonText={
                    event.isOpen ? "Register Now" : "Registration closed"
                  }
                  link={event.link}
                  delay={0.05 * index}
                  disabled={!event.isOpen}
                  description={event.desc}
                />
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;