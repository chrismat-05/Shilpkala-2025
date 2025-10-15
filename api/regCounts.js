import 'dotenv/config';
import axios from 'axios';

const SOURCE_URL = process.env.VITE_REG_COUNT || process.env.REG_COUNT_URL;
const CACHE_TTL = 25 * 1000;

let cache = {
  data: null,
  ts: 0,
  fetching: false,
};

async function fetchRemote() {
  try {
    const res = await axios.get(SOURCE_URL, { timeout: 10000 });
    cache = { data: res.data, ts: Date.now(), fetching: false };
    return cache.data;
  } catch (err) {
    cache.fetching = false;
    throw err;
  }
}

export default async function handler(req, res) {
  if (!SOURCE_URL) {
    return res.status(500).json({ error: "REG_COUNT source not configured (VITE_REG_COUNT / REG_COUNT_URL)" });
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const force = (req.query || req.url?.includes("force=true")) ?? false;

  if (!force && cache.data && (Date.now() - cache.ts) < CACHE_TTL) {
    return res.status(200).json({ data: cache.data, cached: true, lastUpdated: cache.ts });
  }

  if (cache.data && !force) {
    if (!cache.fetching) {
      cache.fetching = true;
      fetchRemote().catch((err) => {
        console.error("[regCounts] background fetch error", err);
      });
    }
    return res.status(200).json({ data: cache.data, cached: true, lastUpdated: cache.ts });
  }

  try {
    const data = await fetchRemote();
    return res.status(200).json({ data, cached: false, lastUpdated: cache.ts });
  } catch (err) {
    console.error("[regCounts] fetch error", err);
    if (cache.data) {
      return res.status(200).json({ data: cache.data, cached: true, lastUpdated: cache.ts, error: "remote fetch failed" });
    }
    return res.status(502).json({ error: "Failed to fetch remote counts" });
  }
}