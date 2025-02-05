import React, { useEffect, useState } from "react";
import { Avatar, List, Pagination } from "flowbite-react";
import { IconButton } from "../../../components/Buttons";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate, useSearchParams } from "react-router-dom";
import DeleteModal from "../../../components/DeleteModal";
import EditModal from "../../../components/EditModal";
import { ProductData } from "../../../types";
import { useProducts } from "../../../hooks/useProducts";
import { InfoAlert } from "../../../components/Alerts";

const AdminDashboardPage: React.FC = (): JSX.Element => {
  const {
    products,
    loading,
    error,
    total,
    searchProducts,
    updateProduct,
    deleteProduct,
    fetchAllProducts,
  } = useProducts();
  const naviget = useNavigate();
  const [deleteModal, setDelModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null,
  );
  const [showEditMessage, setShowEditMessage] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const totalPages: number = Math.ceil(total ? total / 30 : 0);
  const limit = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("q") || "");

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    if (search) {
      searchProducts(search, limit, (page - 1) * limit);
    } else {
      fetchAllProducts(limit, (page - 1) * limit);
    }

    // fetchAllProducts(limit, (page - 1) * limit);
  };

  useEffect(() => {
    if (showEditMessage) {
      const timer = setTimeout(() => {
        setShowEditMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (showDeleteMessage) {
      const timer = setTimeout(() => {
        setShowDeleteMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    const query = searchParams.get("q");

    if (query) {
      console.log(query);

      setSearch(query);
      searchProducts(search, limit, (currentPage - 1) * limit);
    } else {
      fetchAllProducts(limit, (currentPage - 1) * limit);
    }
  }, [
    fetchAllProducts,
    showEditMessage,
    showDeleteMessage,
    currentPage,
    search,
    searchProducts,
    searchParams,
  ]);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    setSearchParams({ q: query });
    await searchProducts(query);
  };

  const handleEditClick = (product: ProductData) => {
    setSelectedProduct(product);
    setEditModal(true);
  };

  const handleDelClick = (product: ProductData) => {
    setSelectedProduct(product);
    setDelModal(true);
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id);
      setShowDeleteMessage(true);
    }
    setDelModal(false);
  };

  const handleEdit = async (updatedProduct: Partial<ProductData>) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, updatedProduct);
      setShowEditMessage(true);
    }
    setEditModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      {showEditMessage && InfoAlert("Product edited successfully.")}
      {showDeleteMessage && InfoAlert("Product deleted successfully.")}

      <div className="mx-auto my-10 flex min-h-screen w-5/6 items-center justify-center ">
        <div className="mx-auto flex w-full flex-col gap-10">
          <input
            className="grow rounded-md border-0 border-none p-3 text-lg text-black"
            autoFocus
            placeholder="Search ..."
            value={search}
            type="text"
            onChange={handleSearchChange}
          />
          <List unstyled className="w-full divide-y divide-accent ">
            {products.map((product, index) => (
              <List.Item key={index} className="w-full p-3 px-5">
                <div className="flex w-full flex-col items-center gap-4 text-center md:flex-row md:text-left">
                  <Avatar
                    img={product.thumbnail}
                    alt="Neil image"
                    size="lg"
                    className="cursor-pointer"
                    onClick={() => {
                      naviget(`/product/${product.id}`);
                    }}
                  />
                  <div
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() => {
                      naviget(`/product/${product.id}`);
                    }}
                  >
                    <p className=" truncate text-sm font-medium text-text">
                      {product.title}
                    </p>
                    <p className="truncate text-sm text-gray-400 ">
                      {product.category}
                    </p>
                  </div>
                  <div className="flex ">
                    <div className="inline-flex items-center text-base font-semibold text-accent ">
                      ${product.price}
                    </div>
                    <div className="ml-10 flex gap-3">
                      <IconButton
                        title="Edit"
                        size="sm"
                        icon={
                          <PencilSquareIcon className="size-4 text-yellow-300" />
                        }
                        onClick={() => {
                          handleEditClick(product);
                        }}
                      />
                      <IconButton
                        title="Delete"
                        size="sm"
                        icon={<TrashIcon className="size-4 text-red-500" />}
                        onClick={() => {
                          handleDelClick(product);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </List.Item>
            ))}
          </List>
        </div>

        {/* Edit Modal */}
        {editModal && selectedProduct && (
          <EditModal
            openModal={editModal}
            setOpenModal={setEditModal}
            product={selectedProduct}
            editFunction={handleEdit}
          />
        )}

        {/* Delete Modal */}
        {deleteModal && selectedProduct && (
          <DeleteModal
            openModal={deleteModal}
            setOpenModal={setDelModal}
            productId={selectedProduct.id}
            delFunction={handleDelete}
          />
        )}
      </div>
      <div className="mb-8 flex justify-center overflow-x-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default AdminDashboardPage;
