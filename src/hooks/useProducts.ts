import { useState, useEffect, useCallback } from "react";
import { productsApi } from "../utils/axios";
import { ProductData, UseProductsReturnType } from "../types";
import { AxiosError } from "axios";

export const useProducts = (): UseProductsReturnType => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProducts = useCallback(
    async (limit: number = 30, skip: number = 0) => {
      setLoading(true);
      setError(null);
      try {
        const response = await productsApi.get(`?limit=${limit}&skip=${skip}`);
        setProducts(response.data.products);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchProductById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsApi.get(`/${id}`);
      setProduct(response.data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProducts = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsApi.get(`/search?q=${query}`);
      setProducts(response.data.products);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductsByCategory = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsApi.get(`/category/${category}`);
      setProducts(response.data.products);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const sortProducts = useCallback(
    async (sortBy: string, order: "asc" | "desc" = "asc") => {
      setLoading(true);
      setError(null);
      try {
        const response = await productsApi.get(
          `?sortBy=${sortBy}&order=${order}`,
        );
        setProducts(response.data.products);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsApi.get("/categories");
      return response.data.categories;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(
    async (newProduct: Partial<ProductData>) => {
      setLoading(true);
      setError(null);
      try {
        await productsApi.post("/add", newProduct);
        await fetchAllProducts(); // Refresh the list after creation
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchAllProducts],
  );

  const updateProduct = useCallback(
    async (id: number, updatedProduct: Partial<ProductData>) => {
      setLoading(true);
      setError(null);
      try {
        await productsApi.put(`/${id}`, updatedProduct);
        await fetchProductById(id); // Refresh the product after update
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchProductById],
  );

  const deleteProduct = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await productsApi.delete(`/${id}`);
        await fetchAllProducts(); // Refresh the list after deletion
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchAllProducts],
  );

  useEffect(() => {
    fetchAllProducts(); // Automatically fetch products on mount
  }, [fetchAllProducts]);

  return {
    products,
    product,
    loading,
    error,
    fetchAllProducts,
    fetchProductById,
    searchProducts,
    fetchProductsByCategory,
    sortProducts,
    fetchCategories,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
