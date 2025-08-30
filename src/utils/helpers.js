export const generateId = () => '_' + Math.random().toString(36).substring(2, 11);
export const formatDate = (isoString) => new Date(isoString).toLocaleDateString();
export const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;
export const getRandomItem = (arr) => arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;