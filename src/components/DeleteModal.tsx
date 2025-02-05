import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Button, Modal } from "flowbite-react";
import React from "react";
import { SecondaryButton } from "./Buttons";

type Props = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  productId: number;
  delFunction: (productId: number) => Promise<void>;
};

const DeleteModal: React.FC<Props> = ({
  openModal,
  setOpenModal,
  productId,
  delFunction,
}: Props): JSX.Element => {
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header className="relative   !bg-secondary " />

      <Modal.Body className=" bg-background p-10 text-gray-300">
        <div className="text-center">
          <ExclamationCircleIcon className="mx-auto mb-4 size-14 fill-red-600" />
          <h3 className="mb-5 text-lg font-normal ">
            Are you sure you want to delete this product?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              className="w-full items-center"
              onClick={async () => {
                setOpenModal(false);
                await delFunction(productId);
              }}
            >
              Yes, I'm sure
            </Button>
            <SecondaryButton
              label="Cancel"
              onClick={() => setOpenModal(false)}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
