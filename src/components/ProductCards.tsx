"use client";

import { Card } from "flowbite-react";
import { ProductData } from "../types";
import { MainButton } from "./Buttons";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import { useCart } from "../hooks/useCart";

type Props = { productData?: ProductData };

export const MainProductCard: React.FC<Props> = ({
  productData,
}: Props): JSX.Element => {
  const navigate = useNavigate();
  const rating = productData ? Math.ceil(productData.rating) : 3;
  const { addToCart } = useCart();
  return (
    <Card
      className="m-3  max-w-sm text-secondary"
      imgAlt={productData ? productData.title : ""}
      imgSrc={
        productData
          ? productData.images[0]
          : " https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
      }
    >
      <a href={`/product/${productData ? productData.id : "5"}`}>
        <h5 className="text-xl font-semibold tracking-tight ">
          {productData
            ? productData.title
            : "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport"}
        </h5>
      </a>
      <StarRating rating={rating} />
      <div className="flex items-center justify-between gap-5">
        <span className="text-3xl font-bold ">
          ${productData ? productData.price : "599"}
        </span>
        <MainButton
          label="Add to cart"
          onClick={() => {
            productData &&
              addToCart({
                id: productData.id,
                title: productData.title,
                price: productData.price,
                discountedTotal:
                  productData.discountPercentage * productData?.price,
                discountPercentage: productData.discountPercentage,
                quantity: 1,
                thumbnail: productData.thumbnail,
                total: productData.price,
              });

            // navigate("/cart");
          }}
        />
        {/* <a
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to cart
        </a> */}
      </div>
    </Card>
  );
};
