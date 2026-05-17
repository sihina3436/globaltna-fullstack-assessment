const TOKEN_COOKIE = "token";

// Save token in cookie
export function setToken(token: string) {
  const maxAge = 60 * 60 * 24 * 7;
  document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; samesite=lax`;
  // Notify all listeners in every tab
  localStorage.setItem("auth_event", Date.now().toString());
  window.dispatchEvent(new Event("authEvent"));
}

// Get token from cookie
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${TOKEN_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

// Remove token from cookie
export function removeToken() {
  document.cookie = `token=; path=/; max-age=0; samesite=lax`;
  localStorage.setItem("auth_event", Date.now().toString());
  window.dispatchEvent(new Event("authEvent"));
}

// Check if user is logged in by verifying token presence
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!getToken();
}

// Logout by removing token and redirecting to auth page
export function logout() {
  removeToken();
  window.location.href = "/";
}