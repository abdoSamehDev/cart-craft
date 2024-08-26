import { Pagination, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { MainProductCard } from "../../../components/ProductCards";
import { useProducts } from "../../../hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import { InfoAlert } from "../../../components/Alerts";
import { useCart } from "../../../hooks/useCart";
import { ProductInCart } from "../../../types";

export default function HomePage() {
  const {
    products,
    loading,
    fetchProductsByCategory,
    searchProducts,
    total,
    sortProducts,
    fetchCategories,
    fetchAllProducts,
  } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allCategory, setAllCategory] = useState<string[]>([]);
  const limit = 30;
  const [showMessage, setShowMessage] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (newProduct: ProductInCart) => {
    addToCart(newProduct);
    setShowMessage(true);
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  useEffect(() => {
    const skip = (currentPage - 1) * limit;
    if (selectedCategory === "") {
      fetchAllProducts(limit, skip);
    } else {
      fetchProductsByCategory(selectedCategory);
    }
  }, [currentPage, selectedCategory, limit]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const categories = await fetchCategories();
      setAllCategory(categories);
    };
    fetchCategoriesData();
  }, [fetchCategories]);

  useEffect(() => {
    setSearchParams({ q: search });
    searchProducts(search);
  }, [search, searchProducts, setSearchParams]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (order: "asc" | "desc") => {
    sortProducts("price", order);
  };

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <>
      {showMessage && (
        <div className="fixed top-0 z-40 w-full">
          {InfoAlert("Product added successfully.")}
        </div>
      )}
      <div className="bg-primary-100 flex min-h-screen flex-col items-center p-6">
        <div className="w-full max-w-7xl">
          <div className="sticky top-0 z-30 mb-8 flex flex-col items-center justify-between rounded-lg bg-background p-4 shadow-md md:flex-row">
            <input
              className="mb-4 flex-grow rounded-md border p-3 text-lg text-black md:mb-0 md:mr-4"
              placeholder="Search ..."
              value={search}
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex w-full items-center space-x-4 md:w-auto">
              <Dropdown label="Sort by Price" className="text-lg">
                <Dropdown.Item
                  className="block w-full px-5 py-3 text-left text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSortChange("asc")}
                >
                  Low to High
                </Dropdown.Item>
                <Dropdown.Item
                  className="block w-full px-5 py-3 text-left text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSortChange("desc")}
                >
                  High to Low
                </Dropdown.Item>
              </Dropdown>

              <Dropdown
                label={selectedCategory || "Category"}
                className="text-lg"
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
                        selectedCategory === category ? "font-bold" : ""
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Dropdown.Item>
                  ))}
                </div>
              </Dropdown>
            </div>
          </div>

          {search.length > 0 && (
            <p className="mb-6 text-center text-base text-gray-600">
              Showing results for "{search}"
            </p>
          )}

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              <div className="col-span-full flex items-center justify-center">
                <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
              </div>
            ) : (
              products.map((product, i) => (
                <MainProductCard
                  key={i}
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
              ))
            )}
          </div>

          <div className="mt-6 flex flex-col items-center text-lg text-gray-600">
            <span>
              Page {currentPage} of {total ? Math.ceil(total / limit) : 0}
            </span>

            <Pagination
              currentPage={currentPage}
              totalPages={total ? Math.ceil(total / limit) : 0}
              onPageChange={onPageChange}
              showIcons
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </>
  );
}
