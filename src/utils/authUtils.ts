/**
 * Encodes a string to base64
 */
export const encodeToBase64 = (data: string): string => {
  return btoa(data);
};

/**
 * Checks if a token is expired
 */
export const isTokenExpired = (expirationDate: string | null): boolean => {
  if (!expirationDate) return true;
  
  const expDate = new Date(expirationDate);
  const currentDate = new Date();
  
  return expDate <= currentDate;
};

/**
 * Formats the current date to string
 */
export const formatCurrentDate = (): string => {
  return new Date().toString();
};

/**
 * Validates user credentials
 */
export const validateCredentials = (username: string, password: string): boolean => {
  return username.length > 0 && password.length > 0;
};

/**
 * Calculates expiration date
 */
export const calculateExpirationDate = (expiresInSeconds: number = 28800): string => {
  const expirationDate = new Date(new Date().getTime() + expiresInSeconds * 1000);
  return expirationDate.toString();
};