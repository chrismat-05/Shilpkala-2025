import 'dotenv/config';
import axios from 'axios';

const SOURCE_URL = process.env.VITE_REG_COUNT || process.env.REG_COUNT_URL;
const CACHE_TTL = 25 * 1000;
const REQUEST_TIMEOUT = Number(process.env.REGCOUNT_TIMEOUT_MS || 30000);
const RETRIES = Number(process.env.REGCOUNT_RETRIES || 2);

let cache = {
  data: null,
  ts: 0,
  fetching: false,
};

async function fetchRemote() {
  let attempt = 0;
  let lastErr = null;
  while (attempt <= RETRIES) {
    try {
      const res = await axios.get(SOURCE_URL, {
        timeout: REQUEST_TIMEOUT,
        maxRedirects: 5,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent': 'Shilpkala-Server/1.0 (+https://kristujayanti.com)',
        },
      });
      cache = { data: res.data, ts: Date.now(), fetching: false };
      return cache.data;
    } catch (err) {
      lastErr = err;
      attempt += 1;
      const waitMs = 500 * attempt;
      console.error(`[regCounts] fetch attempt ${attempt} failed (${err?.code || err?.message}). waiting ${waitMs}ms`);
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }
  cache.fetching = false;
  const e = new Error('Remote fetch failed after retries');
  e.cause = lastErr;
  throw e;
}

export default async function handler(req, res) {
  if (!SOURCE_URL) {
    return res.status(500).json({ error: "REG_COUNT source not configured (VITE_REG_COUNT / REG_COUNT_URL)" });
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const force = Boolean((req.query && req.query.force === 'true') || (req.url && req.url.includes("force=true")));

  if (!force && cache.data && (Date.now() - cache.ts) < CACHE_TTL) {
    return res.status(200).json({ data: cache.data, cached: true, lastUpdated: cache.ts });
  }

  if (cache.data && !force) {
    if (!cache.fetching) {
      cache.fetching = true;
      fetchRemote().catch((err) => {
        console.error("[regCounts] background fetch error", err?.stack || err);
      });
    }
    return res.status(200).json({ data: cache.data, cached: true, lastUpdated: cache.ts });
  }

  try {
    const data = await fetchRemote();
    return res.status(200).json({ data, cached: false, lastUpdated: cache.ts });
  } catch (err) {
    console.error("[regCounts] fetch error", err?.cause || err?.stack || err);
    if (cache.data) {
      return res.status(200).json({ data: cache.data, cached: true, lastUpdated: cache.ts, error: "remote fetch failed" });
    }
    return res.status(502).json({ error: "Failed to fetch remote counts" });
  }
}