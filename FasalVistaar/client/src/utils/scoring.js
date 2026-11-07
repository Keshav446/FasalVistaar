// Simple, explainable scoring (easy to defend in the viva).
// Product: 40% crop match, 30% rating, 20% verified, 10% affordability vs budget.
export function scoreProduct(p, { crop, budget }) {
  const cropMatch = !crop || p.crops.includes(crop) ? 1 : 0;
  const rating = p.rating / 5;
  const verified = p.verification.status === "verified" ? 1 : 0;
  const afford = !budget ? 1 : p.price <= budget ? 1 - p.price / (budget * 1.5) + 0.33 : 0;
  return Math.round(100 * (0.4 * cropMatch + 0.3 * rating + 0.2 * verified + 0.1 * Math.min(afford, 1)));
}

// Seller: 40% price (cheapest = 1), 30% distance (closest = 1), 20% rating, 10% verified.
export function rankSellers(sellers, productId) {
  const list = sellers.filter((s) => s.prices[productId] != null);
  if (!list.length) return [];
  const prices = list.map((s) => s.prices[productId]);
  const dists = list.map((s) => s.distanceKm);
  const [minP, maxP, minD, maxD] = [Math.min(...prices), Math.max(...prices), Math.min(...dists), Math.max(...dists)];
  const norm = (v, lo, hi) => (hi === lo ? 1 : 1 - (v - lo) / (hi - lo));
  return list
    .map((s) => {
      const price = s.prices[productId];
      const score = 0.4 * norm(price, minP, maxP) + 0.3 * norm(s.distanceKm, minD, maxD) + 0.2 * (s.rating / 5) + 0.1 * (s.verified ? 1 : 0);
      return { ...s, price, score: Math.round(score * 100) };
    })
    .sort((a, b) => b.score - a.score);
}

export const rupees = (n) => "₹" + n.toLocaleString("en-IN");