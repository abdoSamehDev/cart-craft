import { Cart } from "../types";

const TOKEN_KEY = "userToken";

const CART_KEY = "user_cart";

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

export const getCartFromLocalStorage = (): Cart | null => {
  const storedCart = localStorage.getItem(CART_KEY);
  return storedCart ? JSON.parse(storedCart) : null;
};

export const saveCartToLocalStorage = (cart: Cart): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeCartFromLocalStorage = (): void => {
  localStorage.removeItem(CART_KEY);
};
