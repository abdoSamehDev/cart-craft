import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Modal } from "flowbite-react";
import React from "react";
import { MainButton, SecondaryButton } from "./Buttons";

type Props = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  totalProducts: number;
  totalPrice: number;
  checkoutFunction: () => void;
};

const CheckoutModal: React.FC<Props> = ({
  openModal,
  setOpenModal,
  totalProducts,
  totalPrice,
  checkoutFunction,
}: Props): JSX.Element => {
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header className="relative   !bg-secondary " />

      <Modal.Body className=" bg-background p-10 text-gray-300">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto mb-4 size-14 fill-primary" />
          <h3 className="mb-5 text-lg font-normal ">
            Are you sure you want to buy these products?
          </h3>
          <div className="my-5">
            <p className="">Total Products: {totalProducts}</p>
            <p className="">Total Price: {totalPrice}$</p>
          </div>

          <div className="flex justify-center gap-4">
            <MainButton
              label="Yes, I'm sure"
              onClick={() => {
                setOpenModal(false);
                checkoutFunction();
              }}
            />

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

export default CheckoutModal;
