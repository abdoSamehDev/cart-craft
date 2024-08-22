"use client";

import { Footer as FooterComponent } from "flowbite-react";
import { getCurrentYear } from "../utils/helpers";
import Logo from "../assets/logo.png";

export function Footer() {
  const currentYear = getCurrentYear();
  return (
    <FooterComponent bgDark className=" rounded-none bg-secondary px-10 py-5">
      <div className="mx-auto w-5/6 bg-secondary text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterComponent.Brand href="/" src={Logo} alt="Logo" />
          {/* <FooterComponent.LinkGroup>
            <FooterComponent.Link href="#">About</FooterComponent.Link>
            <FooterComponent.Link href="#">Privacy Policy</FooterComponent.Link>
            <FooterComponent.Link href="#">Licensing</FooterComponent.Link>
            <FooterComponent.Link href="#">Contact</FooterComponent.Link>
          </FooterComponent.LinkGroup> */}
          <FooterComponent.Copyright
            // href="#"
            className="text-text"
            by="CartCraft. All rights reserved."
            year={currentYear}
          />
        </div>
        <FooterComponent.Divider className="border-primary " />
      </div>
    </FooterComponent>
  );
}

export default Footer;
