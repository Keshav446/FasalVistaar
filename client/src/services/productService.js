import { api } from "./api";

// filters: { search, crop, category, maxPrice, verifiedOnly, sort, page, limit }
export const getProducts = (filters = {}) => api("/products", { params: filters });
export const getProduct = (id) => api(`/products/${id}`);
export const compareProducts = (ids, extra = {}) => api("/products/compare", { params: { ids: ids.join(","), ...extra } });
// location: { lat, lng, maxKm } (all optional)
export const getProductSellers = (id, location = {}) => api(`/products/${id}/sellers`, { params: location });

// Admin only
export const createProduct = (data) => api("/products", { method: "POST", body: data });
export const updateProduct = (id, data) => api(`/products/${id}`, { method: "PUT", body: data });
export const deleteProduct = (id) => api(`/products/${id}`, { method: "DELETE" });