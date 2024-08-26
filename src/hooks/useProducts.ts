import { useState, useEffect, useCallback } from "react";
import { productsApi } from "../utils/axios";
import { ProductData, UseProductsReturnType } from "../types";
import { AxiosError } from "axios";

export const useProducts = (): UseProductsReturnType => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(30);

  const fetchAllProducts = useCallback(
    async (productsLimit: number = limit, productsSkip: number = skip) => {
      setLoading(true);
      setError(null);
      try {
        const response = await productsApi.get(
          `?limit=${productsLimit}&skip=${productsSkip}`,
        );
        setProducts(response.data.products);
        setTotal(response.data.total);
        setSkip(response.data.skip);
        setLimit(response.data.limit);
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
      setTotal(response.data.total);
      setSkip(response.data.skip);
      setLimit(response.data.limit);
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

  const searchProducts = useCallback(
    async (
      query: string,
      productsLimit: number = limit,
      productsSkip: number = skip,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const response = await productsApi.get(
          `/search?q=${query}&limit=${productsLimit}&skip=${productsSkip}`,
        );
        setProducts(response.data.products);
        setTotal(response.data.total);
        setSkip(response.data.skip);
        setLimit(response.data.limit);
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

  const fetchProductsByCategory = useCallback(
    async (
      category: string,
      productsLimit: number = limit,
      productsSkip: number = skip,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const response = await productsApi.get(
          `/category/${category}&limit=${productsLimit}&skip=${productsSkip}`,
        );
        setProducts(response.data.products);
        setTotal(response.data.total);
        setSkip(response.data.skip);
        setLimit(response.data.limit);
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

  const sortProducts = useCallback(
    async (
      sortBy: string,
      order: "asc" | "desc" = "asc",
      productsLimit: number = limit,
      productsSkip: number = skip,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const response = await productsApi.get(
          `?sortBy=${sortBy}&order=${order}&limit=${productsLimit}&skip=${productsSkip}`,
        );
        setProducts(response.data.products);
        setTotal(response.data.total);
        setSkip(response.data.skip);
        setLimit(response.data.limit);

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
      console.log("API Response:", response.data); 
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else {
        console.warn("Unexpected response structure:", response.data);
        return [];
      }
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
        await fetchAllProducts();
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
        await fetchProductById(id);
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
        await fetchAllProducts();
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
    fetchAllProducts();
  }, [fetchAllProducts]);

  return {
    products,
    product,
    loading,
    error,
    total,
    skip,
    limit,
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
