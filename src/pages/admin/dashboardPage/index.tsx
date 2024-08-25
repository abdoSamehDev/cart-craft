import React, { useEffect, useState } from "react";
import { Avatar, List } from "flowbite-react";
import { IconButton } from "../../../components/Buttons";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
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
    fetchAllProducts(200, 0);
  }, [fetchAllProducts, showEditMessage, showDeleteMessage]);

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
        <List unstyled className="w-full divide-y divide-accent ">
          {products.map((product, index) => (
            <List.Item key={index} className="w-full p-3 px-5">
              <div className="flex w-full items-center gap-4 rtl:space-x-reverse">
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
    </>
  );
};

export default AdminDashboardPage;
