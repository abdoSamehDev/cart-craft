import React from "react";
import { ProductData, ProductFromData } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { SecondaryButton } from "./Buttons";

type Props = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  createFunction: (product: Partial<ProductData>) => Promise<void>;
};

const AddModal: React.FC<Props> = ({
  openModal,
  setOpenModal,
  createFunction,
}: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFromData>({});

  const onSubmit: SubmitHandler<ProductFromData> = async (data) => {
    console.log(data);
    const tagsArray = data.tags.split(",").map((tag) => tag.trim());
    const price = Number(data.price);
    const stock = Number(data.stock);

    const productData = {
      ...data,
      price: price,
      stock: stock,
      tags: tagsArray,
    };

    console.log("API DATA " + productData.title);

    await createFunction(productData);

    setOpenModal(false);
    reset();
  };
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header className="relative bg-secondary" />

      <Modal.Body className=" bg-background p-10 text-gray-300">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center">
            <PlusCircleIcon className="mx-auto mb-4 size-14 " />
            <h3 className="mb-8 text-lg font-normal ">Add New Product</h3>
            <div className="my-3 flex flex-col items-start">
              <div className="mb-2 block ">
                <Label htmlFor="title" value="Title" className="text-text" />
              </div>

              <TextInput
                id="title"
                className="w-full"
                placeholder="Title"
                type="text"
                {...register("title", { required: true, maxLength: 100 })}
              />
              {errors.title && (
                <span className="mt-2 text-red-500">
                  {errors.title.type === "required" &&
                    "This field is required."}
                  {errors.title.type === "maxLength" &&
                    "Max length is 100 characters."}
                </span>
              )}
            </div>
            <div className="my-3 flex flex-col items-start">
              <div className="mb-2 block ">
                <Label
                  htmlFor="description"
                  value="Description"
                  className="text-text"
                />
              </div>

              <Textarea
                id="description"
                className="w-full"
                placeholder="Description"
                rows={4}
                {...register("description", {
                  required: true,
                  maxLength: 2000,
                })}
              />
              {errors.description && (
                <span className="mt-2 text-red-500">
                  {errors.description.type === "required" &&
                    "This field is required."}
                  {errors.description.type === "maxLength" &&
                    "Max length is 2000 characters."}
                </span>
              )}
            </div>
            <div className="my-3 flex flex-col items-start">
              <div className="mb-2 block ">
                <Label htmlFor="brand" value="brand" className="text-text" />
              </div>

              <TextInput
                id="brand"
                className="w-full"
                placeholder="Brand"
                type="text"
                {...register("brand", { required: true })}
              />
              {errors.brand && (
                <span className="mt-2 text-red-500">
                  This Field is required
                </span>
              )}
            </div>
            <div className="my-3 flex flex-col items-start">
              <div className="mb-2 block ">
                <Label htmlFor="price" value="Price" className="text-text" />
              </div>

              <div className="relative w-full">
                <TextInput
                  id="price"
                  className="w-full"
                  placeholder="Price"
                  type="number"
                  step="0.01"
                  prefix="$"
                  {...register("price", { required: true })}
                />
                <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
              </div>
              {errors.price && (
                <span className="mt-2 text-red-500">
                  This Field is required
                </span>
              )}
            </div>
            <div className="my-3 flex flex-col items-start">
              <div className="mb-2 block ">
                <Label htmlFor="stock" value="Stock" className="text-text" />
              </div>

              <TextInput
                id="stock"
                className="w-full"
                placeholder="Stock"
                type="text"
                {...register("stock", { required: true })}
              />
              {errors.stock && (
                <span className="mt-2 text-red-500">
                  This Field is required
                </span>
              )}
            </div>
            <div className="my-3 flex flex-col items-start">
              <div className="mb-2 block ">
                <Label htmlFor="tags" value="Tags" className="text-text" />
              </div>

              <TextInput
                id="tags"
                className="w-full"
                placeholder="Tags"
                type="text"
                helperText="Comma-Separated"
                {...register("tags", { required: true })}
              />
              {errors.tags && (
                <span className="mt-2 text-red-500">
                  This Field is required
                </span>
              )}
            </div>

            <div className="mt-5 flex justify-center gap-4">
              <Button
                autoFocus={false}
                type="submit"
                className="w-full items-center bg-primary text-secondary transition-all duration-75 hover:text-white"
                color=""
              >
                Add
              </Button>
              <SecondaryButton
                label="Cancel"
                onClick={() => setOpenModal(false)}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
