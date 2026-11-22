export const toNumber = (p) =>
  typeof p === "number" ? p : parseFloat(String(p ?? 0).replace(/[₹,\s]/g, "")) || 0;

export const inr = (n) =>
  "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });