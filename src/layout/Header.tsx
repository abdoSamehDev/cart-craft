import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { AdminData, ProductData } from "../types";
import { isAuthenticated, removeUserToken } from "../store/localStore";
import { MainButton } from "../components/Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import AddModal from "../components/AddModal";
import { InfoAlert } from "../components/Alerts";
import { useProducts } from "../hooks/useProducts";

type Props = { adminData?: AdminData };

const Header: React.FC<Props> = ({ adminData }: Props): JSX.Element => {
  const navigate = useNavigate();
  const isAdmin: boolean = isAuthenticated();
  // const isAdmin: boolean = true;
  const location = useLocation();
  const { createProduct } = useProducts();
  const [addModal, setAddModal] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddClick = () => {
    setAddModal(true); // Open the add modal
  };

  const handleCreateProduct = async (newProduct: Partial<ProductData>) => {
    await createProduct(newProduct);
    setShowMessage(true);

    setAddModal(false);
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <>
      <Navbar fluid className="z-50 bg-secondary shadow-lg">
        <div className="mx-auto flex w-5/6 items-center justify-between">
          <Navbar.Brand href="/">
            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
          </Navbar.Brand>
          <div className="flex gap-5">
            {isAdmin ? (
              <div className="flex gap-5">
                {location.pathname === "/admin-dashboard" && (
                  <MainButton
                    label="Add a Product"
                    onClick={() => {
                      handleAddClick();
                    }}
                  />
                )}
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      alt="User settings"
                      img={`${adminData ? adminData.image : "https://dummyjson.com/icon/emilys/128"}`}
                      rounded
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {adminData ? adminData.firstName : ""}{" "}
                      {adminData ? adminData.lastName : ""}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {adminData ? adminData.email : ""}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item>
                    <Navbar.Link href="/admin-dashboard">Dashboard</Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      removeUserToken();
                      navigate("/");
                    }}
                  >
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>
            ) : (
              <MainButton
                className="w-auto"
                label="Sign In"
                onClick={() => navigate("/admin-login")}
              />
            )}
            <MainButton
              label="Cart"
              className="w-auto"
              onClick={() => {
                navigate("/cart");
              }}
            />
          </div>
        </div>
        {/* Edit Modal */}
        {addModal && (
          <AddModal
            openModal={addModal}
            setOpenModal={setAddModal}
            createFunction={handleCreateProduct}
          />
        )}
      </Navbar>
      {showMessage && InfoAlert("Product added successfully.")}
    </>
  );
};

export default Header;
