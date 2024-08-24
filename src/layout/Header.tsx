import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { AdminData } from "../types";
import { isAuthenticated } from "../store/localStore";
import { MainButton } from "../components/Buttons";
import { useLocation } from "react-router-dom";
import AddModal from "../components/AddModal";

type Props = { adminData?: AdminData };

const Header: React.FC<Props> = ({ adminData }: Props): JSX.Element => {
  // const isAdmin: boolean = isAuthenticated();
  const isAdmin: boolean = true;
  const location = useLocation();

  const [addModal, setAddModal] = useState<boolean>(false);

  const handleAddClick = () => {
    setAddModal(true); // Open the add modal
  };

  return (
    <Navbar fluid className="bg-secondary shadow-lg">
      <div className="mx-auto flex w-5/6 items-center justify-between">
        <Navbar.Brand href="/">
          <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
        </Navbar.Brand>

        {isAdmin ? (
          <div className="flex gap-5">
            {/* <Navbar.Toggle /> */}
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
              // onClick={
              //   // TODO: SIGNOUT FUNCTION
              // }
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <>
            <MainButton
              label="Sign In"
              // onClick={
              //    //TODO: SIGN IN FUNCTION
              //  }
            />
            {/* <SecondaryButton
              label="Sign In"
              //  onClick={
              //  //TODO: SIGN IN FUNCTION
              //  }
            /> */}
          </>
        )}
      </div>
      {/* Edit Modal */}
      {addModal && <AddModal openModal={addModal} setOpenModal={setAddModal} />}
    </Navbar>
  );
};

export default Header;
