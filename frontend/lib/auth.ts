const TOKEN_COOKIE = "token";

export function setToken(token: string) {
  const maxAge = 60 * 60 * 24 * 7;
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(
    token
  )}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${TOKEN_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export function removeToken() {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function isLoggedIn(): boolean {
  return !!getToken();
}