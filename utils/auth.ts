
const ADMIN_TOKEN_KEY = 'admin_session_token';

/**
 * Stores the admin token in sessionStorage.
 */
export function setAdminToken(token: string): void {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
}

/**
 * Retrieves the admin token from sessionStorage.
 */
export function getAdminToken(): string | null {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

/**
 * Clears the admin token from sessionStorage.
 */
export function clearAdminToken(): void {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}
