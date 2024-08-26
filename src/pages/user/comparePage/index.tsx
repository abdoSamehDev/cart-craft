import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainProductCard } from '../../../components/ProductCards';
import { ProductData, Category } from '../../../types';
import { useProducts } from '../../../hooks/useProducts';
import { Dropdown, Button, Card, Spinner } from 'flowbite-react';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const ProductCompare = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedProductFromDetail = location.state?.selectedProduct || null;

  const { products, categories, loading, error, fetchAllProducts, fetchProductsByCategory, fetchCategories } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(selectedProductFromDetail);
  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [allCategory, setAllCategory] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const categoriesData = await fetchCategories();
      setAllCategory(categoriesData);
    };
    fetchCategoriesData();
  }, [fetchCategories]);

  useEffect(() => {
    const skip = 0;
    const limit = 10;
    if (selectedCategory === '') {
      fetchAllProducts(limit, skip);
    } else {
      fetchProductsByCategory(selectedCategory);
    }
  }, [fetchAllProducts, fetchProductsByCategory, selectedCategory]);

  useEffect(() => {
    setSelectedProduct(selectedProductFromDetail);
  }, [selectedProductFromDetail]);

  const handleAddToComparison = (product: ProductData) => {
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveFromComparison = (productId: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8 sticky top-0 z-30 bg-background">
        <Button
          color="blue"
          onClick={() => navigate('/')}
          className="flex items-center space-x-2"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </Button>

        <div className="flex items-center mx-4">
          <label htmlFor="compareSelect" className="block text-lg font-semibold mr-4">
            Select Product:
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
        </div>

        <Dropdown
          label={selectedCategory || "Select Category"}
          className="text-lg max-h-64 overflow-y-auto"
        >
          <Dropdown.Item onClick={() => handleCategoryClick("")}>
            All Categories
          </Dropdown.Item>
          {allCategory.map((category) => (
            <Dropdown.Item
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className={selectedCategory === category.name ? "font-bold" : ""}
            >
              {category.name}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>








      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6 ">
        {selectedProduct && !selectedProducts.find((p) => p.id === selectedProduct.id) && (
          <Card>
            <MainProductCard key={selectedProduct.id} productData={selectedProduct} />
            <Button
              onClick={() => handleAddToComparison(selectedProduct)}
              className=""
              color="green"
            >
              <FaCheckCircle className="mr-2" />
              Add to Comparison
            </Button>
          </Card>
        )}

        {selectedProducts.map((product) => (
          <Card key={product.id}>
            <MainProductCard productData={product} />
            <Button
              onClick={() => handleRemoveFromComparison(product.id)}
              className="mt-4"
              color="red"
            >
              Remove
            </Button>
          </Card>
        ))}
      </div>

      {selectedProducts.length > 0 && (
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
      )}
    </div>
  );
};

export default ProductCompare;
