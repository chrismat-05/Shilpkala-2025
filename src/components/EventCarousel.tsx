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
  autoplayMs?: number; // ms between slides
  className?: string;
};

const EventCarousel: React.FC<Props> = ({ events, autoplayMs = 3500, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: true });
  const [selected, setSelected] = React.useState(0);
  const timerRef = React.useRef<number | null>(null);

  // keep selected in sync
  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  // autoplay with pause on hover/focus/visibility
  React.useEffect(() => {
    if (!emblaApi) return;

    const start = () => {
      stop();
      timerRef.current = window.setInterval(() => {
        if (emblaApi) emblaApi.scrollNext();
      }, autoplayMs);
    };
    const stop = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [emblaApi, autoplayMs]);

  const scrollPrev = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  if (!events || events.length === 0) return null;

  return (
    <section className={`relative ${className ?? ""}`}>
      <div className="flex items-center justify-between mb-3">
        <div /> {/* placeholder for optional heading area */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              scrollPrev();
              // restart autoplay timer when user interacts
              if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = window.setInterval(() => emblaApi?.scrollNext(), autoplayMs);
              }
            }}
            aria-label="Previous"
            className="p-2 rounded-md bg-black/30 hover:bg-black/40 text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              scrollNext();
              if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = window.setInterval(() => emblaApi?.scrollNext(), autoplayMs);
              }
            }}
            aria-label="Next"
            className="p-2 rounded-md bg-black/30 hover:bg-black/40 text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => {
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }}
        onMouseLeave={() => {
          if (emblaApi && !timerRef.current) {
            timerRef.current = window.setInterval(() => emblaApi.scrollNext(), autoplayMs);
          }
        }}
        onFocus={() => {
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }}
        onBlur={() => {
          if (emblaApi && !timerRef.current) {
            timerRef.current = window.setInterval(() => emblaApi.scrollNext(), autoplayMs);
          }
        }}
      >
        <div ref={emblaRef} className="flex touch-pan-x -ml-4 pl-4">
          {events.map((ev, idx) => {
            const isSelected = idx === selected;
            return (
              <div
                key={`${ev.title}-${idx}`}
                className={`flex-none px-4 transition-transform duration-700 ease-in-out ${
                  isSelected ? "scale-105" : "scale-95 opacity-80"
                }`}
                style={{ minWidth: "42%", maxWidth: "48%" }}
                aria-hidden={!isSelected}
              >
                <div className="h-[560px]">
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
              </div>
            );
          })}
        </div>
      </div>

      {/* simple dots for orientation (optional) */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {events.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`w-2 h-2 rounded-full ${i === selected ? "bg-primary" : "bg-white/30"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default EventCarousel;