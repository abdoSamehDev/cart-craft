const TOKEN_KEY = "userToken";

// Save userToken to localStorage
export const saveUserToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Failed to save token", error);
  }
};

// Load userToken from localStorage
export const loadUserToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Failed to load token", error);
    return null;
  }
};

// Remove userToken from localStorage
export const removeUserToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Failed to remove token", error);
  }
};

// Check if the user is authenticated (i.e., token exists)
export const isAuthenticated = (): boolean => {
  return !!loadUserToken();
};
