import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  });
  const [selected, setSelected] = React.useState(0);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const start = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => emblaApi.scrollNext(), autoplayMs);
    };
    const stop = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    start();
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [emblaApi, autoplayMs]);

  const handlePrev = () => emblaApi?.scrollPrev();
  const handleNext = () => emblaApi?.scrollNext();

  if (!events || events.length === 0) return null;

  return (
    <section className={`relative ${className ?? ""}`}>
      {/* overlayed arrow controls (no extra vertical space) */}
      <div className="absolute top-2 right-3 z-10 flex gap-2">
        <button
          onClick={handlePrev}
          aria-label="Previous"
          className="p-2 rounded-md bg-black/30 hover:bg-black/40 text-white transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next"
          className="p-2 rounded-md bg-black/30 hover:bg-black/40 text-white transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* embla viewport */}
      <div
        ref={emblaRef}
        className="overflow-hidden pt-2 pb-3"
        onMouseEnter={() => {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }}
        onMouseLeave={() => {
          if (emblaApi && !timerRef.current) {
            timerRef.current = window.setInterval(() => emblaApi.scrollNext(), autoplayMs);
          }
        }}
      >
        {/* embla container */}
        <div className="flex touch-pan-x -ml-4 pl-4">
          {events.map((ev, idx) => {
            const isSelected = idx === selected;
            return (
              <div
                key={`${ev.title}-${idx}`}
                className={`flex-none px-4 transition-transform duration-700 ease-in-out ${
                  isSelected ? "scale-105" : "scale-95 opacity-80"
                } ${
                  // Wider on small screens for the highlighted slide
                  isSelected
                    ? "w-[80%] sm:w-[60%] md:w-[30%] lg:w-[30%]"
                    : "w-[50%] sm:w-[40%] md:w-[30%] lg:w-[30%]"
                }`}
                aria-hidden={!isSelected}
              >
                {/* let the card define its own height; no fixed h-[] to avoid extra space */}
                <EventCard
                  title={ev.title}
                  imageUrl={ev.image ? resolveImage(ev.image) : undefined}
                  buttonText={ev.isOpen ? "Register Now" : "Registration closed"}
                  link={ev.link}
                  delay={0}
                  disabled={!ev.isOpen}
                  description={ev.desc}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;