"use client";
import { Pagination, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { MainProductCard } from "../../../components/ProductCards";
import useFetch from "../../../hooks/useFetch";
import { ProductData } from "../../../types/index";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("q") || "");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  const limit = 10;

  const [data, loading, totalPosts, allCategory, allTags] = useFetch(
    `/search`,
    search,
    sortOrder,
    selectedCategory,
    selectedTag,
    currentPage,
    limit
  );

  const totalPages = Math.ceil(totalPosts / limit);

  useEffect(() => {
    setSearchParams({ q: search });
  }, [search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  const handleTagClick = (tag: string) => {
    if (selectedCategory) {
      setSelectedTag(tag);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === "") setSelectedTag("");
    setSelectedCategory(category);
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  

  return (
    <div className="flex flex-col items-center min-h-screen bg-primary-100 p-6">
      <div className="w-full max-w-7xl">
        <div className="flex flex-wrap gap-4 mb-6 p-6 bg-background rounded-lg  top-0 z-50 md:sticky md:top-0  md:flex-row md:gap-6">
          <input
            className="border p-3 rounded-md flex-grow text-lg text-black"
            placeholder="Search ..."
            value={search}
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchParams({ q: e.target.value });
            }}
          />

          <Dropdown label="Sort by Price" className="text-lg w-full md:w-auto ">
            <Dropdown.Item
              className="block w-full md:px-5 py-3 text-gray-700 hover:bg-gray-100 text-left"
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

          <Dropdown label={selectedCategory || "Category"} className="text-lg w-full md:w-auto">
            <Dropdown.Item
              className="block w-full px-5 py-3 text-gray-700 hover:bg-gray-100 text-left"
              onClick={() => handleCategoryClick("")}
            >
              All
            </Dropdown.Item>
            {allCategory.map((e, i) => (
              <Dropdown.Item
                key={i}
                className={`block w-full px-5 py-3 text-gray-700 hover:bg-gray-100 text-left ${
                  selectedCategory === e ? "font-bold" : ""
                }`}
                onClick={() => handleCategoryClick(e)}
              >
                {e}
              </Dropdown.Item>
            ))}
          </Dropdown>

          {selectedCategory && (
            <Dropdown label={selectedTag || "Tag"} className="text-lg w-full md:w-auto">
              <Dropdown.Item
                className="block w-full px-5 py-3 text-gray-700 hover:bg-gray-100 text-left"
                onClick={() => handleTagClick("")}
              >
                All
              </Dropdown.Item>
              {allTags.map((tag, i) => (
                <Dropdown.Item
                  key={i}
                  className="block w-full px-5 py-3 text-gray-700 hover:bg-gray-100 text-left"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Dropdown.Item>
              ))}
            </Dropdown>
          )}
        </div>

        {search.length > 0 && (
          <p className="text-base text-gray-600 mb-6 text-center">
            Showing results for "{search}"
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center">
              <div className="w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            data.map((product: ProductData, i: number) => (
              <MainProductCard key={i} productData={product} />
            ))
          )}
        </div>

        <div className="flex justify-center mt-6 text-gray-600 text-lg">
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="flex flex-wrap justify-center overflow-x-auto mt-6 md:sticky md:bottom-0 z-20">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
            className="mb-9"
          />
        </div>
      </div>
    </div>
  );
}
