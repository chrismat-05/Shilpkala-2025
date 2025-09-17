
import eventsData from "@/data/events.json";
import axios from "axios";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import React from "react";

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

const fetchCounts = async () => {
  const res = await axios.get(REG_COUNT_API);
  return res.data as RegCounts;
};

const Registrations: React.FC = () => {
  const [open, setOpen] = React.useState<{ [event: string]: boolean }>({});
  const [lastRefresh, setLastRefresh] = React.useState<Date>(new Date());
  const { data: counts = {}, isLoading, isError, refetch, isFetching } = useAutoRefresh<RegCounts>(
    ["reg-counts"],
    async () => {
      const data = await fetchCounts();
      setLastRefresh(new Date());
      return data;
    },
    30000
  );

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gradient-bg text-foreground">Loading...</div>;
  if (isError) return <div className="min-h-screen flex items-center justify-center bg-gradient-bg text-destructive">Failed to fetch registration data</div>;

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-bg relative">
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
      {/* Auto-refresh indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/90 border border-border shadow-card text-xs text-muted-foreground">
          <svg className={`w-4 h-4 animate-spin ${isFetching ? '' : 'opacity-30'}`} viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
          <span>Auto-refreshing</span>
          <span className="ml-2">{lastRefresh.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Registrations;
