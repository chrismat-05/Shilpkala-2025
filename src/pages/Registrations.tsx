import React, { useEffect, useState } from "react";
import eventsData from "@/data/events.json";
import axios from "axios";

const REG_COUNT_API = import.meta.env.VITE_REG_COUNT;

interface RegCount {
  firstYear: number;
  secondYear: number;
  thirdYear: number;
  total: number;
}

interface RegCounts {
  [eventName: string]: RegCount;
}

const Registrations: React.FC = () => {
  const [counts, setCounts] = useState<RegCounts>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<{ [event: string]: boolean }>({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(REG_COUNT_API)
      .then((res) => {
        setCounts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch registration data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gradient-bg text-foreground">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gradient-bg text-destructive">{error}</div>;

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-bg">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-8 text-foreground">Event Registrations</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {eventsData.filter(e => e.type === "event").map((event) => {
            const reg = counts[event.title] || { firstYear: 0, secondYear: 0, thirdYear: 0, total: 0 };
            return (
              <div key={event.title} className="bg-card/80 border border-border rounded-lg shadow-card overflow-hidden flex flex-col">
                {event.image && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-semibold text-foreground">{event.title}</span>
                  <button
                    className="flex items-center gap-1 text-primary hover:text-primary-hover font-semibold focus:outline-none"
                    onClick={() => setOpen((o) => ({ ...o, [event.title]: !o[event.title] }))}
                    aria-expanded={!!open[event.title]}
                    aria-controls={`dropdown-${event.title}`}
                  >
                    <span>{reg.total}</span>
                    <svg className={`w-5 h-5 transition-transform ${open[event.title] ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
                {open[event.title] && (
                  <div id={`dropdown-${event.title}`} className="px-4 pb-4 text-sm animate-in fade-in-0 zoom-in-95">
                    <div className="flex justify-between py-1"><span>First Year</span><span>{reg.firstYear}</span></div>
                    <div className="flex justify-between py-1"><span>Second Year</span><span>{reg.secondYear}</span></div>
                    <div className="flex justify-between py-1"><span>Third Year</span><span>{reg.thirdYear}</span></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Registrations;
