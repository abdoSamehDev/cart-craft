import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://dummyjson.com/auth",
});

export const productsApi = axios.create({
  baseURL: "https://dummyjson.com/products",
});

export const cartsApi = axios.create({
  baseURL: "https://dummyjson.com/carts",
});
