import React from "react";
import { MainProductCard } from "../../../components/ProductCards";

type Props = {};

const HomePage: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="mx-auto grid w-5/6 grid-cols-4">
      <MainProductCard />
      <MainProductCard />
      <MainProductCard />
      <MainProductCard />
      <MainProductCard />
      <MainProductCard />
      <MainProductCard />
      <MainProductCard />
    </div>
  );
};

export default HomePage;
