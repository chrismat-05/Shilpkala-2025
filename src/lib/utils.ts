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