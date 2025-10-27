export function getRegistrationStats(counts: { [event: string]: { firstYear: number; secondYear: number; thirdYear: number; total: number } }) {
  let total = 0, firstYear = 0, secondYear = 0, thirdYear = 0;
  Object.values(counts).forEach(reg => {
    total += reg.total || 0;
    firstYear += reg.firstYear || 0;
    secondYear += reg.secondYear || 0;
    thirdYear += reg.thirdYear || 0;
  });
  return { total, firstYear, secondYear, thirdYear };
}
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Event scheduling helpers ---
export type EventSchedule = { startAt?: string; endAt?: string };

export function getEventStatus(s: EventSchedule, now: Date = new Date()) {
  const start = s.startAt ? new Date(s.startAt) : undefined;
  const end = s.endAt ? new Date(s.endAt) : undefined;
  const msNow = now.getTime();

  const fifteenMin = 15 * 60 * 1000;
  const isHappeningNow = !!(start && end && msNow >= start.getTime() && msNow < end.getTime());
  const isStartingSoon = !!(start && msNow >= start.getTime() - fifteenMin && msNow < start.getTime());
  const isOver = !!(end && msNow >= end.getTime());

  return { isHappeningNow, isStartingSoon, isOver } as const;
}

export function isRegistrationOpen(baseOpen: boolean | undefined, s: EventSchedule, now: Date = new Date()) {
  const { isOver } = getEventStatus(s, now);
  return !!baseOpen && !isOver;
}

export const TITLE_ALIASES: Record<string, string> = {
  "Echoes Of Pencil": "Echoes of Pencil",
  "Mosaic of Moment": "Mosaic of Moments",
  "Flame Free Feast": "Flame-Free Feast",
  "Scrapbook Project": "The Scrapbook Project",
};