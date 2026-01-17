export const getToken = () => localStorage.getItem("token");

export const getRole = () => localStorage.getItem("role");

export const isAuthenticated = () => !!getToken();

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("profileCompleted");
  localStorage.removeItem("tokenExpiry");
};

export const isTokenExpired = () => {
  const expiry = localStorage.getItem("tokenExpiry");
  if (!expiry) return true;

  return Date.now() > Number(expiry);
}
