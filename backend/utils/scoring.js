// Same formulas as the frontend (client/src/utils/scoring.js), so results match.

// Product: 40% crop fit, 30% rating, 20% verified, 10% affordability.
function scoreProduct(p, { crop, budget } = {}) {
  const cropMatch = !crop || p.crops.includes(crop) ? 1 : 0;
  const rating = p.rating / 5;
  const verified = p.verification?.status === "verified" ? 1 : 0;
  const afford = !budget ? 1 : p.price <= budget ? 1 - p.price / (budget * 1.5) + 0.33 : 0;
  return Math.round(100 * (0.4 * cropMatch + 0.3 * rating + 0.2 * verified + 0.1 * Math.min(afford, 1)));
}

// Seller: 40% price, 30% distance, 20% rating, 10% verified. Each part is 0..1.
// If distance is unknown (no lat/lng sent), its 30% is dropped and the rest re-weighted.
function rankSellers(entries) {
  if (!entries.length) return [];
  const prices = entries.map((e) => e.price);
  const dists = entries.map((e) => e.distanceKm).filter((d) => d != null);
  const hasDist = dists.length === entries.length;
  const [minP, maxP] = [Math.min(...prices), Math.max(...prices)];
  const [minD, maxD] = hasDist ? [Math.min(...dists), Math.max(...dists)] : [0, 0];
  const norm = (v, lo, hi) => (hi === lo ? 1 : 1 - (v - lo) / (hi - lo));

  return entries
    .map((e) => {
      const price = norm(e.price, minP, maxP);
      const rating = e.rating / 5;
      const verified = e.verified ? 1 : 0;
      const score = hasDist
        ? 0.4 * price + 0.3 * norm(e.distanceKm, minD, maxD) + 0.2 * rating + 0.1 * verified
        : (0.4 * price + 0.2 * rating + 0.1 * verified) / 0.7;
      return { ...e, score: Math.round(score * 100) };
    })
    .sort((a, b) => b.score - a.score);
}

module.exports = { scoreProduct, rankSellers };