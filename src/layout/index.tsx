import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import React from "react";

type Props = {};
const Layout: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
