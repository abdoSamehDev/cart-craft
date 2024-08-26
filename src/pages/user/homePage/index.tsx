import { Pagination, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { MainProductCard } from "../../../components/ProductCards";
import { useProducts } from "../../../hooks/useProducts";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const { 
    products, 
    loading, 
    fetchProductsByCategory, 
    searchProducts, 
    totalPosts,
    sortProducts, 
    fetchCategories,
    fetchAllProducts
  } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allCategory, setAllCategory] = useState<{ name: string; slug: string }[]>([]);
  const limit = 30;

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
    setSortOrder(order);
    sortProducts("price", order);
  };

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex flex-col items-center min-h-screen bg-primary-100 p-6">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 sticky top-0 z-30 bg-background p-4 shadow-md rounded-lg">
          <input
            className="border p-3 rounded-md flex-grow text-lg text-black mb-4 md:mb-0 md:mr-4"
            placeholder="Search ..."
            value={search}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Dropdown label="Sort by Price" className="text-lg">
              <Dropdown.Item
                className="block w-full px-5 py-3 text-gray-700 hover:bg-gray-100 text-left"
                onClick={() => handleSortChange("asc")}
              >
                Low to High
              </Dropdown.Item>
              <Dropdown.Item
                className="block w-full px-5 py-3 text-gray-700 hover:bg-gray-100 text-left"
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
                  className="block w-full px-5 py-3 text-gray-700 hover:bg-gray-100 text-left"
                  onClick={() => handleCategoryClick("")} 
                >
                  All
                </Dropdown.Item>
                {allCategory.map((category, i) => (
                  <Dropdown.Item
                    key={i}
                    className={`block w-full px-5 py-3 text-gray-700 hover:bg-gray-100 text-left ${
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
        </div>

        {search.length > 0 && (
          <p className="text-base text-gray-600 mb-6 text-center">
            Showing results for "{search}"
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center">
              <div className="w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            products.map((product, i) => (
              <MainProductCard key={i} productData={product} />
            ))
          )}
        </div>

        <div className="flex flex-col items-center mt-6 text-gray-600 text-lg">
          <span>
            Page {currentPage} of {Math.ceil(totalPosts / limit)}
          </span>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalPosts / limit)}
            onPageChange={onPageChange}
            showIcons
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
}
