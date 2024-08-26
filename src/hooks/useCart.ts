import { useState, useEffect } from "react";
import { cartsApi } from "../utils/axios";
import { Cart, ProductInCart, UseCartsReturnType } from "../types";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
  removeCartFromLocalStorage,
} from "../store/localStore";

export const useCart = (): UseCartsReturnType => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = getCartFromLocalStorage();
    //   if (storedCart && storedCart?.totalProducts !== 0)
    if (storedCart) {
      setCart(storedCart);
    } else {
      fetchInitialCart();
    }
  }, []);

  const fetchInitialCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cartsApi.get("/1");
      const initialCart: Cart = response.data;

      setCart(initialCart);
      saveCartToLocalStorage(initialCart);
      console.log("Cart" + cart);
    } catch (error) {
      setError(`Failed to fetch initial cart: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: ProductInCart) => {
    setError(null);

    try {
      let updatedCart: Cart;

      if (cart) {
        updatedCart = {
          ...cart,
          products: [...cart.products, product],
          total: cart.total + product.total,
          discountedTotal: cart.discountedTotal + product.discountedTotal,
          totalProducts: cart.totalProducts + 1,
          totalQuantity: cart.totalQuantity + product.quantity,
        };
      } else {
        updatedCart = {
          products: [product],
          total: product.total,
          discountedTotal: product.discountedTotal,
          totalProducts: 1,
          totalQuantity: product.quantity,
        };
      }

      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    } catch (error) {
      setError(`Failed to add product to cart: ${error}`);
    }
  };

  const removeFromCart = (productId: number) => {
    setError(null);

    if (!cart) return;

    try {
      const updatedProducts = cart.products.filter(
        (product) => product.id !== productId,
      );

      const updatedCart: Cart = {
        ...cart,
        products: updatedProducts,
        total: updatedProducts.reduce((acc, product) => acc + product.total, 0),
        discountedTotal: updatedProducts.reduce(
          (acc, product) => acc + product.discountedTotal,
          0,
        ),
        totalProducts: updatedProducts.length,
        totalQuantity: updatedProducts.reduce(
          (acc, product) => acc + product.quantity,
          0,
        ),
      };

      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);

      checkAndRemoveEmptyCart();
    } catch (error) {
      setError(`Failed to remove product from cart: ${error}`);
    }
  };

  const updateCart = async (
    cartId: number,
    products: ProductInCart[],
    merge = true,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cartsApi.put(`/${cartId}`, {
        merge,
        products,
      });
      const updatedCart: Cart = response.data;
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    } catch (error) {
      setError(`Failed to update cart: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const updateCartProductQuyantity = (
    productId: number,
    newQuantity: number,
  ) => {
    setError(null);

    if (!cart) return;

    try {
      const updatedProducts = cart.products.map((product) => {
        if (product.id === productId) {
          const updatedProduct = {
            ...product,
            quantity: newQuantity,
            total: product.price * newQuantity,
            discountedTotal: product.discountedTotal * newQuantity,
          };
          return updatedProduct;
        }
        return product;
      });

      const updatedCart: Cart = {
        ...cart,
        products: updatedProducts,
        total: updatedProducts.reduce((acc, product) => acc + product.total, 0),
        discountedTotal: updatedProducts.reduce(
          (acc, product) => acc + product.discountedTotal,
          0,
        ),
        totalProducts: updatedProducts.length,
        totalQuantity: updatedProducts.reduce(
          (acc, product) => acc + product.quantity,
          0,
        ),
      };

      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    } catch (error) {
      setError(`Failed to update product quantity: ${error}`);
    }
  };

  const deleteCart = async (cartId: number) => {
    setLoading(true);
    setError(null);
    try {
      await cartsApi.delete(`/${cartId}`);
      setCart(null);
      removeCartFromLocalStorage();
    } catch (error) {
      setError(`Failed to delete cart: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const checkAndRemoveEmptyCart = () => {
    if (!cart || cart.totalProducts === 0) {
      setCart(null);
      removeCartFromLocalStorage();
      fetchInitialCart();
    }
  };

  const getCart = () => {
    return cart;
  };

  return {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateCart,
    updateCartProductQuyantity,
    deleteCart,
    checkAndRemoveEmptyCart,
    getCart,
  };
};
