import React, { useEffect, useState } from "react";
import { Avatar, List } from "flowbite-react";
import { IconButton, MainButton } from "../../../components/Buttons";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/DeleteModal";
import { ProductInCart } from "../../../types";
import { InfoAlert } from "../../../components/Alerts";
import { useCart } from "../../../hooks/useCart";
import LoadingSpinner from "../../../components/Spinner";
import ErrorPage from "../../ErrorPage";
import CheckoutModal from "../../../components/CheckoutModal";

const CartPage: React.FC = (): JSX.Element => {
  const { cart, loading, error, removeFromCart, updateCartProductQuyantity } =
    useCart();

  const naviget = useNavigate();
  const [deleteModal, setDelModal] = useState<boolean>(false);
  const [checkoutModal, setCheckoutModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductInCart | null>(
    null,
  );
  const [showEditMessage, setShowEditMessage] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

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
    if (showCheckoutMessage) {
      const timer = setTimeout(() => {
        setShowCheckoutMessage(false);
        naviget("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [naviget, showCheckoutMessage, showDeleteMessage, showEditMessage]);

  const handleDelClick = (product: ProductInCart) => {
    setSelectedProduct(product);
    setDelModal(true);
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      removeFromCart(selectedProduct.id);
      setShowDeleteMessage(true);
    }
    setDelModal(false);
  };

  const handleCheckout = async () => {
    setShowCheckoutMessage(true);
    setCheckoutModal(false);
  };

  const handleQuantityChange = (product: ProductInCart, increment: boolean) => {
    const newQuantity = increment ? product.quantity + 1 : product.quantity - 1;
    if (newQuantity > 0) {
      updateCartProductQuyantity(product.id, newQuantity);
      setShowEditMessage(true);
    } else {
      handleDelClick(product);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;
  return (
    <>
      {showEditMessage && InfoAlert("Product edited successfully.")}
      {showDeleteMessage && InfoAlert("Product deleted successfully.")}
      {showCheckoutMessage && InfoAlert("Purchase completed successfully.")}

      <div className="mx-auto my-10 flex min-h-screen w-5/6 justify-center ">
        <div className="mx-auto flex w-full flex-col gap-10">
          <h1 className="text-5xl font-bold">Cart</h1>
          <List unstyled className="size-full divide-y divide-accent ">
            {cart?.totalProducts === 0 ? (
              <div className="flex size-full items-center justify-center">
                <h2 className=" text-center text-xl">Your Cart Is Empty</h2>
              </div>
            ) : (
              cart?.products.map((product, index) => (
                <List.Item key={index} className="w-full p-3 px-5">
                  <div className="flex w-full flex-col items-center gap-4 text-center md:flex-row md:text-left">
                    <Avatar
                      img={product.thumbnail}
                      alt="Product Image"
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
                        Amount: {product.quantity}
                      </p>
                    </div>
                    <div className="flex ">
                      <div className="inline-flex items-center text-base font-semibold text-accent ">
                        ${product.total.toFixed(2)}
                      </div>
                      <div className="ml-10 flex gap-3">
                        <div className="flex items-center gap-2">
                          <IconButton
                            title="Decrease"
                            size="sm"
                            icon={
                              <MinusIcon className="size-4 text-gray-500" />
                            }
                            onClick={() => handleQuantityChange(product, false)}
                          />
                          <span className="text-lg">{product.quantity}</span>
                          <IconButton
                            title="Increase"
                            size="sm"
                            icon={<PlusIcon className="size-4 text-gray-500" />}
                            onClick={() => handleQuantityChange(product, true)}
                          />
                        </div>
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
              ))
            )}
            {/* <FooterDivider /> */}
            <List.Item className="w-full p-3 px-5">
              <div className="flex w-full flex-col items-center gap-4 text-center md:flex-row md:text-left">
                <div className="min-w-0 flex-1 cursor-pointer">
                  <h2 className="truncate text-lg font-medium text-text">
                    Total
                  </h2>
                  <p className="truncate text-sm text-gray-400 ">
                    Amount: {cart?.totalQuantity}
                  </p>
                </div>
                <div className="flex ">
                  <div className="inline-flex items-center text-base font-semibold text-accent ">
                    ${cart?.total.toFixed(2)}
                  </div>
                  <div className="ml-10 flex gap-3">
                    <div className="flex items-center gap-2">
                      <MainButton
                        label="Checkout"
                        onClick={() => {
                          setCheckoutModal(true);
                        }}
                      />

                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          </List>
        </div>

        {/* Delete Modal */}
        {deleteModal && selectedProduct && (
          <DeleteModal
            openModal={deleteModal}
            setOpenModal={setDelModal}
            productId={selectedProduct.id}
            delFunction={handleDelete}
          />
        )}

        {/* Checkout Modal */}
        {checkoutModal && (
          <CheckoutModal
            openModal={checkoutModal}
            setOpenModal={setCheckoutModal}
            totalProducts={cart ? cart.totalProducts : 0}
            totalPrice={cart ? cart.total : 0}
            checkoutFunction={handleCheckout}
          />
        )}
      </div>
    </>

  );
};

export default CartPage;
