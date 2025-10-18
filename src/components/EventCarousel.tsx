import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import EventCard from "@/components/EventCard";
import { resolveImage } from "@/lib/images";

type EventItem = {
  title: string;
  image?: string;
  link?: string;
  isOpen?: boolean;
  desc?: string;
};

type Props = {
  events: EventItem[];
  autoplayMs?: number;
  className?: string;
};

const EventCarousel: React.FC<Props> = ({ events, autoplayMs = 3500, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    inViewThreshold: 0.6,
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = React.useState(0);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const start = () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => emblaApi.scrollNext(), autoplayMs);
    };
    const stop = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    const raf = window.requestAnimationFrame(start);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.cancelAnimationFrame(raf);
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [emblaApi, autoplayMs]);

  const restartAutoplay = React.useCallback(() => {
    if (!emblaApi) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => emblaApi.scrollNext(), autoplayMs);
  }, [emblaApi, autoplayMs]);

  const handlePrev = () => {
    emblaApi?.scrollPrev();
    restartAutoplay();
  };
  const handleNext = () => {
    emblaApi?.scrollNext();
    restartAutoplay();
  };

  if (!events || events.length === 0) return null;

  return (
    <section className={`relative ${className ?? ""}`}>
      <div className="absolute top-2 right-3 z-10 flex gap-2">
        <motion.button
          onClick={handlePrev}
          aria-label="Previous"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-md bg-black/30 hover:bg-black/40 text-white transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={handleNext}
          aria-label="Next"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-md bg-black/30 hover:bg-black/40 text-white transition"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      <div ref={emblaRef} className="overflow-hidden pt-2 pb-3">
        <div className="flex touch-pan-x -ml-4 pl-4">
          {events.map((ev, idx) => {
            const isSelected = idx === selected;
            return (
              <motion.div
                key={`${ev.title}-${idx}`}
                className="shrink-0 px-4 basis-[92%] sm:basis-[76%] md:basis-[48%] lg:basis-[44%]"
                animate={{ scale: isSelected ? 1.05 : 0.95, opacity: isSelected ? 1 : 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                aria-hidden={!isSelected}
              >
                <EventCard
                  title={ev.title}
                  imageUrl={ev.image ? resolveImage(ev.image) : undefined}
                  buttonText={ev.isOpen ? "Register Now" : "Registration closed"}
                  link={ev.link || "#"}
                  delay={0}
                  disabled={!ev.isOpen}
                  description={ev.desc}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;