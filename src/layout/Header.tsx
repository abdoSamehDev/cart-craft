import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import Logo from "../assets/logo.png";
import { AdminData } from "../types";
import { isAuthenticated } from "../store/localStore";
import { MainButton } from "../components/Buttons";

type Props = { adminData?: AdminData };

const Header: React.FC<Props> = ({ adminData }: Props): JSX.Element => {
  const isAdmin: boolean = isAuthenticated();

  return (
    <Navbar fluid className="bg-secondary shadow-lg">
      <div className="mx-auto flex w-5/6 items-center justify-between">
        <Navbar.Brand href="/">
          <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
        </Navbar.Brand>

        {isAdmin ? (
          <div className="flex md:order-2">
            {/* <Navbar.Toggle /> */}
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
    </Navbar>
  );
};

export default Header;
