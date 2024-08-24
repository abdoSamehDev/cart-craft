import React, { useState } from "react";
import { dummyData } from "./dummyData";
import { Avatar, List } from "flowbite-react";
import { IconButton } from "../../../components/Buttons";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/DeleteModal";
import EditModal from "../../../components/EditModal";
import { ProductData } from "../../../types";

type Props = {};

const AdminDashboardPage: React.FC<Props> = (props: Props): JSX.Element => {
  const data = dummyData;
  const naviget = useNavigate();
  const [deleteModal, setDelModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData>(null); // Track the selected product

  const handleEditClick = (product: ProductData) => {
    setSelectedProduct(product); // Set the selected product
    setEditModal(true); // Open the edit modal
  };

  const handleDelClick = (product: ProductData) => {
    setSelectedProduct(product); // Set the selected product
    setDelModal(true); // Open the edit modal
  };
  return (
    <div className="mx-auto my-10 flex min-h-screen w-5/6 items-center justify-center ">
      <List unstyled className="w-full divide-y divide-accent ">
        {data.products.map((product, index) => (
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
        />
      )}

      {/* Delete Modal */}
      {deleteModal && selectedProduct && (
        <DeleteModal
          openModal={deleteModal}
          setOpenModal={setDelModal}
          productId={selectedProduct.id}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;
