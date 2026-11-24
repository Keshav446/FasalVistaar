const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Caches GET responses by URL and adds the header  X-Cache: HIT  or  X-Cache: MISS  (show it in the demo).
const cacheResponse = (ttl = 60) => (req, res, next) => {
  if (req.method !== "GET") return next();

  const key = req.originalUrl;
  const hit = cache.get(key);
  if (hit) {
    res.set("X-Cache", "HIT");
    return res.json(hit);
  }

  res.set("X-Cache", "MISS");
  const send = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode === 200) cache.set(key, body, ttl);
    return send(body);
  };
  next();
};

// Call after any create / update / delete so users never see stale data.
const clearCache = () => cache.flushAll();

module.exports = { cacheResponse, clearCache };