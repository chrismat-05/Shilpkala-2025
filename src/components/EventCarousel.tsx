import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventCard from "@/components/EventCard";
import { resolveImage } from "@/lib/images";

type EventItem = { title: string; image?: string; link?: string; isOpen?: boolean; desc?: string; };
type Props = { events: EventItem[]; autoplayMs?: number; className?: string; };

const EventCarousel: React.FC<Props> = ({ events, autoplayMs = 3500, className }) => {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: (events?.length ?? 0) > 1,
    slidesToScroll: 1,
    skipSnaps: false,
  });
  const [selected, setSelected] = React.useState(0);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    const root = viewportRef.current;
    const imgs = root ? Array.from(root.querySelectorAll("img")) : [];
    const onImgLoad = () => emblaApi.reInit();
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", onImgLoad, { once: true });
        img.addEventListener("error", onImgLoad, { once: true });
      }
    });

    const onResize = () => emblaApi.reInit();
    window.addEventListener("resize", onResize);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      window.removeEventListener("resize", onResize);
    };
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const start = () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        if (!emblaApi) return;
        const snaps = emblaApi.scrollSnapList().length;
        if (snaps <= 1) return;
        const next = (emblaApi.selectedScrollSnap() + 1) % snaps;
        emblaApi.scrollTo(next);
      }, autoplayMs);
    };
    const stop = () => {
      if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
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

  const restartAutoplay = () => {
    if (!emblaApi) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      if (!emblaApi) return;
      const snaps = emblaApi.scrollSnapList().length;
      if (snaps <= 1) return;
      const next = (emblaApi.selectedScrollSnap() + 1) % snaps;
      emblaApi.scrollTo(next);
    }, autoplayMs);
  };

  const handlePrev = () => {
    if (!emblaApi) return;
    const snaps = emblaApi.scrollSnapList().length;
    if (snaps <= 1) return;
    const prev = (emblaApi.selectedScrollSnap() - 1 + snaps) % snaps;
    emblaApi.scrollTo(prev);
    restartAutoplay();
  };
  const handleNext = () => {
    if (!emblaApi) return;
    const snaps = emblaApi.scrollSnapList().length;
    if (snaps <= 1) return;
    const next = (emblaApi.selectedScrollSnap() + 1) % snaps;
    emblaApi.scrollTo(next);
    restartAutoplay();
  };

  if (!events || events.length === 0) return null;

  return (
    <section className={`relative ${className ?? ""}`}>
      <div className="absolute top-2 right-3 z-10 flex gap-2">
        <button onClick={handlePrev} aria-label="Previous" className="p-2 rounded-md bg-black/30 hover:bg-black/40 text-white transition">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={handleNext} aria-label="Next" className="p-2 rounded-md bg-black/30 hover:bg-black/40 text-white transition">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div ref={(el) => { viewportRef.current = el; emblaRef(el); }} className="overflow-hidden pt-2 pb-3">
        <div className="flex gap-4 px-4 touch-pan-x">
          {events.map((ev, idx) => {
            const isSelected = idx === selected;
            return (
              <div
                key={`${ev.title}-${idx}`}
                className={`flex-none min-w-0 transition-transform duration-700 ease-in-out ${
                  isSelected ? "scale-105" : "scale-95 opacity-80"
                } basis-[92%] sm:basis-[76%] md:basis-[48%] lg:basis-[44%]`}
                aria-hidden={!isSelected}
              >
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