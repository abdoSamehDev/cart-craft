import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainProductCard } from "../../../components/ProductCards";
import { ProductData } from "../../../types";
import { useProducts } from "../../../hooks/useProducts";
import { Pagination, Dropdown } from "flowbite-react"; // Adjust import as needed

const ProductCompare = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Assuming the selected product is passed via location state from ProductPageDetail
  const selectedProductFromDetail = location.state?.selectedProduct || null;

  const {
    products,
    categories,
    loading,
    error,
    fetchAllProducts,
    fetchProductsByCategory,
    fetchCategories,
  } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    selectedProductFromDetail,
  );
  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [allCategory, setAllCategory] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const categoriesData = await fetchCategories();
      setAllCategory(categoriesData);
    };
    fetchCategoriesData();
  }, [fetchCategories]);

  useEffect(() => {
    const skip = 0; // Or your logic for pagination
    const limit = 10; // Or your logic for pagination
    if (selectedCategory === "") {
      fetchAllProducts(limit, skip);
    } else {
      fetchProductsByCategory(selectedCategory);
    }
  }, [fetchAllProducts, fetchProductsByCategory, selectedCategory]);

  useEffect(() => {
    // Set the selected product from detail page if passed via location state
    setSelectedProduct(selectedProductFromDetail);
  }, [selectedProductFromDetail]);

  // Function to add a product to the selected products list for comparison
  const handleAddToComparison = (product: ProductData) => {
    if (!selectedProducts.find((p) => p.id === product.id)) {
      const updatedProducts = [...selectedProducts, product];
      setSelectedProducts(updatedProducts);
    }
  };

  // Function to remove a product from the selected products list
  const handleRemoveFromComparison = (productId: number) => {
    const updatedProducts = selectedProducts.filter((p) => p.id !== productId);
    setSelectedProducts(updatedProducts);
  };

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Product Comparison
      </h1>
      <div className="top-0 z-50 mb-6 flex flex-wrap gap-4 rounded-lg bg-background p-6 md:sticky md:top-0 md:flex-row md:gap-6">
        <button
          onClick={() => navigate("/")}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600"
        >
          Back to Home
        </button>

        <Dropdown
          label={selectedCategory || "Category"}
          className="w-full text-center text-lg md:w-auto"
        >
          <div className="max-h-64 overflow-y-auto">
            <Dropdown.Item
              className="block w-full px-5 py-3 text-left text-gray-700 hover:bg-gray-100"
              onClick={() => handleCategoryClick("")}
            >
              All
            </Dropdown.Item>
            {allCategory.map((category, i) => (
              <Dropdown.Item
                key={i}
                className={`block w-full px-5 py-3 text-left text-gray-700 hover:bg-gray-100 ${
                  selectedCategory === category.name ? "font-bold" : ""
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </Dropdown.Item>
            ))}
          </div>
        </Dropdown>
      </div>
      <div className="sticky top-6 z-10 mb-4"></div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Display selected product from ProductPageDetail */}
        {selectedProduct && (
          <MainProductCard
            key={selectedProduct.id}
            productData={selectedProduct}
          >
            {/* <button
              onClick={() => setSelectedProduct(null)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Remove
            </button> */}
          </MainProductCard>
        )}

        {/* Display additional selected products */}
        {selectedProducts.length > 0 &&
          selectedProducts.map((product, i) => (
            <MainProductCard key={i} productData={product}>
              {/* <button
              onClick={() => handleRemoveFromComparison(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Remove
            </button> */}
            </MainProductCard>
          ))}

        {/* Dropdown to select a category */}

        {/* Dropdown to select another product for comparison */}
        <div className="col-span-full mt-6">
          <label
            htmlFor="compareSelect"
            className="mb-2 block text-lg font-semibold"
          >
            Select another product for comparison:
          </label>
          <select
            id="compareSelect"
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            value={selectedProduct ? selectedProduct.id.toString() : ""}
            onChange={(e) => {
              const productId = parseInt(e.target.value);
              const product = products.find((prod) => prod.id === productId);
              setSelectedProduct(product || null);
            }}
          >
            <option value="" className="text-black">
              Select a product
            </option>
            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
                className="text-black"
              >
                {product.title}
              </option>
            ))}
          </select>

          {/* Button to add selected product to comparison */}
          {selectedProduct &&
            !selectedProducts.find((p) => p.id === selectedProduct.id) && (
              <button
                onClick={() => handleAddToComparison(selectedProduct)}
                className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-600"
              >
                Add to Comparison
              </button>
            )}
        </div>

        {/* Table to display product details */}
        {selectedProducts.length > 0 && (
          <div className="col-span-full mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-lg border bg-white shadow-md">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Discounted Price</th>
                    <th className="px-4 py-2">Rating</th>
                    <th className="px-4 py-2">Availability</th>
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">Brand</th>
                    <th className="px-4 py-2">SKU</th>
                    <th className="px-4 py-2">Dimensions</th>
                    <th className="px-4 py-2">Weight</th>
                    <th className="px-4 py-2">Warranty</th>
                    <th className="px-4 py-2">Shipping</th>
                    <th className="px-4 py-2">Tags</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {selectedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{product.title}</td>
                      <td className="px-4 py-2">${product.price}</td>
                      <td className="px-4 py-2">
                        $
                        {(
                          (product.price * (100 - product.discountPercentage)) /
                          100
                        ).toFixed(2)}
                      </td>
                      <td className="px-4 py-2">{product.rating}</td>
                      <td className="px-4 py-2">
                        {product.availabilityStatus}
                      </td>
                      <td className="px-4 py-2">{product.stock}</td>
                      <td className="px-4 py-2">{product.brand}</td>
                      <td className="px-4 py-2">{product.sku}</td>
                      <td className="px-4 py-2">{`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`}</td>
                      <td className="px-4 py-2">{product.weight} g</td>
                      <td className="px-4 py-2">
                        {product.warrantyInformation}
                      </td>
                      <td className="px-4 py-2">
                        {product.shippingInformation}
                      </td>
                      <td className="px-4 py-2">{product.tags.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCompare;
