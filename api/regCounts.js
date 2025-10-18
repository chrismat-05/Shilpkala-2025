import 'dotenv/config';
import axios from 'axios';

const SOURCE_URL = process.env.VITE_REG_COUNT || process.env.REG_COUNT_URL;
const CACHE_TTL = 25 * 1000;
const REQUEST_TIMEOUT = Number(process.env.REGCOUNT_TIMEOUT_MS || 30000);
const RETRIES = Number(process.env.REGCOUNT_RETRIES || 2);

let cache = { data: null, ts: 0 };

async function fetchRemote() {
  let attempt = 0, lastErr = null;
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
      cache = { data: res.data, ts: Date.now() };
      return cache.data;
    } catch (err) {
      lastErr = err; attempt += 1;
      await new Promise(r => setTimeout(r, 400 * attempt));
    }
  }
  const e = new Error('Remote fetch failed after retries');
  e.cause = lastErr;
  throw e;
}

export default async function handler(req, res) {
  // Never cache at CDN/browser
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');

  if (!SOURCE_URL) {
    return res.status(500).json({ error: "REG_COUNT source not configured (VITE_REG_COUNT / REG_COUNT_URL)" });
  }
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const force = Boolean((req.query && req.query.force === 'true') || (req.url && req.url.includes("force=true")));
  const expired = (Date.now() - cache.ts) >= CACHE_TTL;

  try {
    if (!cache.data || expired || force) {
      const data = await fetchRemote(); // fetch fresh synchronously
      return res.status(200).json({ data, cached: false, lastUpdated: cache.ts });
    }
    return res.status(200).json({ data: cache.data, cached: true, lastUpdated: cache.ts });
  } catch (err) {
    if (cache.data) return res.status(200).json({ data: cache.data, cached: true, lastUpdated: cache.ts, error: "remote fetch failed" });
    return res.status(502).json({ error: "Failed to fetch remote counts" });
  }
}