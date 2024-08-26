import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainProductCard } from "../../../components/ProductCards";
import { ProductData, ProductInCart } from "../../../types";
import { useProducts } from "../../../hooks/useProducts";
import { Dropdown, Button, Card } from "flowbite-react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useCart } from "../../../hooks/useCart";
import { InfoAlert } from "../../../components/Alerts";

const ProductCompare = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedProductFromDetail = location.state?.selectedProduct || null;

  const {
    products,
    fetchAllProducts,
    fetchProductsByCategory,
    fetchCategories,
  } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    selectedProductFromDetail,
  );
  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [allCategory, setAllCategory] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (newProduct: ProductInCart) => {
    addToCart(newProduct);
    setShowMessage(true);
  };

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
    if (selectedCategory === "") {
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
    <>
      {showMessage && (
        <div className="fixed top-0 z-40 w-full">
          {InfoAlert("Product added successfully.")}
        </div>
      )}
      <div className="container mx-auto p-6">
        <div className="sticky top-0 z-30 mb-8 flex items-center justify-between bg-background">
          <Button
            color="blue"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </Button>

          <div className="mx-4 flex items-center">
            <label
              htmlFor="compareSelect"
              className="mr-4 block text-lg font-semibold"
            >
              Select Product:
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
          </div>

          <Dropdown
            label={selectedCategory || "Select Category"}
            className="max-h-64 overflow-y-auto text-lg"
          >
            <Dropdown.Item onClick={() => handleCategoryClick("")}>
              All Categories
            </Dropdown.Item>
            {allCategory.map((category) => (
              <Dropdown.Item
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={selectedCategory === category ? "font-bold" : ""}
              >
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {selectedProduct &&
            !selectedProducts.find((p) => p.id === selectedProduct.id) && (
              <Card>
                <MainProductCard
                  key={selectedProduct.id}
                  productData={selectedProduct}
                  addToCart={() => {
                    handleAddToCart({
                      id: selectedProduct.id,
                      title: selectedProduct.title,
                      price: selectedProduct.price,
                      discountedTotal:
                        selectedProduct.discountPercentage *
                        selectedProduct?.price,
                      discountPercentage: selectedProduct.discountPercentage,
                      quantity: 1,
                      thumbnail: selectedProduct.thumbnail,
                      total: selectedProduct.price,
                    });
                  }}
                />
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
              <MainProductCard
                productData={product}
                addToCart={() => {
                  handleAddToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    discountedTotal:
                      product.discountPercentage * product?.price,
                    discountPercentage: product.discountPercentage,
                    quantity: 1,
                    thumbnail: product.thumbnail,
                    total: product.price,
                  });
                }}
              />
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
                    <td className="px-4 py-2">{product.availabilityStatus}</td>
                    <td className="px-4 py-2">{product.stock}</td>
                    <td className="px-4 py-2">{product.brand}</td>
                    <td className="px-4 py-2">{product.sku}</td>
                    <td className="px-4 py-2">{`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`}</td>
                    <td className="px-4 py-2">{product.weight} g</td>
                    <td className="px-4 py-2">{product.warrantyInformation}</td>
                    <td className="px-4 py-2">{product.shippingInformation}</td>
                    <td className="px-4 py-2">{product.tags.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCompare;
