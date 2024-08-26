import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MainProductCard } from '../../../components/ProductCards';
import { ProductData } from '../../../types';
import { useProducts } from '../../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
const ProductCompare = () => {
  const location = useLocation();

  // Assuming the selected product is passed via location state from ProductPageDetail
  const selectedProductFromDetail = location.state?.selectedProduct || null;

  const { products, loading, error, fetchAllProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(selectedProductFromDetail);
  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllProducts(); // Fetch all products when the component mounts
  }, [fetchAllProducts]);

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Product Comparison</h1>
      <div className="mb-4 sticky top-6 z-10">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Back to Home
        </button>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Display selected product from ProductPageDetail */}
        {selectedProduct && (
          <MainProductCard key={selectedProduct.id} productData={selectedProduct}>
            <button
              onClick={() => setSelectedProduct(null)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Remove
            </button>
          </MainProductCard>
        )}

        {/* Display additional selected products */}
        {selectedProducts.length > 0 && selectedProducts.map((product, i) => (
          <MainProductCard key={i} productData={product}>
            <button
              onClick={() => handleRemoveFromComparison(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Remove
            </button>
          </MainProductCard>
        ))}

        {/* Dropdown to select another product for comparison */}
        <div className="col-span-full mt-6">
          <label htmlFor="compareSelect" className="block text-lg font-semibold mb-2">
            Select another product for comparison:
          </label>
          <select
            id="compareSelect"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            value={selectedProduct ? selectedProduct.id.toString() : ''}
            onChange={(e) => {
              const productId = parseInt(e.target.value);
              const product = products.find((prod) => prod.id === productId);
              setSelectedProduct(product || null);
            }}
          >
            <option value="" className='text-black'>Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id} className='text-black'>
                {product.title}
              </option>
            ))}
          </select>

          {/* Button to add selected product to comparison */}
          {selectedProduct && !selectedProducts.find((p) => p.id === selectedProduct.id) && (
            <button
              onClick={() => handleAddToComparison(selectedProduct)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 mt-4"
            >
              Add to Comparison
            </button>
          )}
        </div>

        {/* Table to display product details */}
        {selectedProducts.length > 0 && (
          <div className="col-span-full mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg shadow-md">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-2 px-4">Product Name</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Discounted Price</th>
                    <th className="py-2 px-4">Rating</th>
                    <th className="py-2 px-4">Availability</th>
                    <th className="py-2 px-4">Stock</th>
                    <th className="py-2 px-4">Brand</th>
                    <th className="py-2 px-4">SKU</th>
                    <th className="py-2 px-4">Dimensions</th>
                    <th className="py-2 px-4">Weight</th>
                    <th className="py-2 px-4">Warranty</th>
                    <th className="py-2 px-4">Shipping</th>
                    <th className="py-2 px-4">Tags</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {selectedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4">{product.title}</td>
                      <td className="py-2 px-4">${product.price}</td>
                      <td className="py-2 px-4">${((product.price * (100 - product.discountPercentage)) / 100).toFixed(2)}</td>
                      <td className="py-2 px-4">{product.rating}</td>
                      <td className="py-2 px-4">{product.availabilityStatus}</td>
                      <td className="py-2 px-4">{product.stock}</td>
                      <td className="py-2 px-4">{product.brand}</td>
                      <td className="py-2 px-4">{product.sku}</td>
                      <td className="py-2 px-4">{`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`}</td>
                      <td className="py-2 px-4">{product.weight} g</td>
                      <td className="py-2 px-4">{product.warrantyInformation}</td>
                      <td className="py-2 px-4">{product.shippingInformation}</td>
                      <td className="py-2 px-4">{product.tags.join(', ')}</td>
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
