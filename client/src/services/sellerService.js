import { api } from "./api";

export const getSellers = (filters = {}) => api("/sellers", { params: filters });
export const getSeller = (id) => api(`/sellers/${id}`);

// Seller / admin
export const getMySeller = () => api("/sellers/mine"); // the logged-in seller's own shop (data is null if none yet)
export const createSeller = (data) => api("/sellers", { method: "POST", body: data });
export const updateSeller = (id, data) => api(`/sellers/${id}`, { method: "PUT", body: data });
export const deleteSeller = (id) => api(`/sellers/${id}`, { method: "DELETE" });

// Add a product to the shop, or change its price / quantity (quantity 0 = out of stock)
export const saveStock = (sellerId, { product, price, quantity }) =>
  api(`/sellers/${sellerId}/stock`, { method: "PUT", body: { product, price, quantity } });
export const removeStock = (sellerId, productId) => api(`/sellers/${sellerId}/stock/${productId}`, { method: "DELETE" });