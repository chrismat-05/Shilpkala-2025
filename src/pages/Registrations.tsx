import eventsData from "@/data/events.json";
import { resolveImage } from "@/lib/images";
import axios from "axios";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import React from "react";
import ShilpkalaLoader from "../components/ShilpkalaLoader";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart2, GraduationCap, Sparkles, User2 } from "lucide-react";
import { getRegistrationStats } from "@/lib/utils";

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
  try {
    const res = await axios.get(REG_COUNT_API);
    return res.data as RegCounts;
  } catch (error) {
    throw error;
  }
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

  const navigate = useNavigate();

  if (isLoading) return <ShilpkalaLoader />;
  if (isError) return <div className="min-h-screen flex items-center justify-center bg-gradient-bg text-destructive">Failed to fetch registration data</div>;

  const stats = getRegistrationStats(counts);
  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-bg relative">
      <div className="max-w-6xl mx-auto">
        {/* top-right brand using PirataOne (only on this page) */}
        <div className="absolute top-6 right-6 z-40">
          <span className="font-pirata text-sm text-foreground/80">Shilpkala 2025</span>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-full hover:bg-card-hover focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Event Registrations</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex items-center gap-4 bg-card/80 border border-border rounded-lg shadow-card p-5">
            <div className="bg-primary/10 rounded-full p-3">
              <BarChart2 className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{stats.total}</div>
              <div className="text-xs text-muted-foreground font-medium">Total</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-card/80 border border-border rounded-lg shadow-card p-5">
            <div className="bg-primary/10 rounded-full p-3">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{stats.firstYear}</div>
              <div className="text-xs text-muted-foreground font-medium">1st Year</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-card/80 border border-border rounded-lg shadow-card p-5">
            <div className="bg-primary/10 rounded-full p-3">
              <User2 className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{stats.secondYear}</div>
              <div className="text-xs text-muted-foreground font-medium">2nd Year</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-card/80 border border-border rounded-lg shadow-card p-5">
            <div className="bg-primary/10 rounded-full p-3">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{stats.thirdYear}</div>
              <div className="text-xs text-muted-foreground font-medium">3rd Year</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {eventsData.filter(e => e.type === "event").map((event) => {
            const reg = counts[event.title] || { firstYear: 0, secondYear: 0, thirdYear: 0, total: 0 };
            return (
              <div key={event.title} className="bg-card/80 border border-border rounded-lg shadow-card overflow-hidden flex flex-col">
                {event.image && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img src={resolveImage(event.image)} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-pirata font-semibold text-foreground">{event.title}</span>
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
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
          {isFetching ? (
            <div className="flex items-center gap-2 bg-card/80 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-md backdrop-blur animate-pulse">
              <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span>Refreshing...</span>
            </div>
          ) : (
            <div className="flex items-center bg-card/80 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-md backdrop-blur">
              <span>Automatically refreshes every 30 sec. &nbsp;|&nbsp; Last refreshed at {lastRefresh.toLocaleTimeString()}</span>
            </div>
          )}
      </div>
    </div>
  );
};

export default Registrations;
