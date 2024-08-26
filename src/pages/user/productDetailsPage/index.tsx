import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainButton } from "../../../components/Buttons";
import StarRating from "../../../components/StarRating";
import { useProducts } from "../../../hooks/useProducts";
import LoadingSpinner from "../../../components/Spinner";
import ErrorPage from "../../ErrorPage";
import { useCart } from "../../../hooks/useCart";
import { InfoAlert } from "../../../components/Alerts";
import { ProductInCart } from "../../../types";

const ProductPageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { product, fetchProductById, loading, error } = useProducts();
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = (newProduct: ProductInCart) => {
    addToCart(newProduct);
    setShowMessage(true);
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id));
    }
  }, [id, fetchProductById]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div>
      {showMessage && (
        <div className="fixed top-0 z-40 w-full">
          {InfoAlert("Product added successfully.")}
        </div>
      )}
      <div className="container mx-auto rounded-lg bg-[#1A202C] p-4 shadow-md">
        <div className="sticky top-6 z-10 mb-4">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src={product.thumbnail || "https://via.placeholder.com/300"}
              alt={product.title}
              className="w-full max-w-sm rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h1 className="mb-4 text-4xl font-extrabold text-white">
              {product.title}
            </h1>
            <p className="mb-4 text-lg text-gray-300">{product.description}</p>

            <StarRating rating={product.rating} />

            <div className="mb-4 text-3xl font-semibold text-primary">
              ${discountedPrice}{" "}
              <span className="ml-2 text-lg text-gray-500 line-through">
                ${product.price}
              </span>
            </div>

            <p className={`text-white-400 mb-4 font-semibold`}>
              {product.availabilityStatus} ({product.stock} in stock)
            </p>

            <div className="mb-2 text-lg">
              <p className="mb-2">
                <span className="font-semibold text-white">Brand:</span>
                <span className="text-gray-300"> {product.brand}</span>
              </p>
              <p className="mb-4">
                <span className="font-semibold text-white">SKU:</span>
                <span className="text-gray-300"> {product.sku}</span>
              </p>
            </div>

            <div className="mb-2 text-lg">
              <p className="mb-2">
                <span className="font-semibold text-white">Dimensions:</span>
                <span className="text-gray-300">
                  {" "}
                  {product.dimensions.width} x {product.dimensions.height} x{" "}
                  {product.dimensions.depth} cm
                </span>
              </p>
              <p className="mb-4">
                <span className="font-semibold text-white">Weight:</span>
                <span className="text-gray-300"> {product.weight} g</span>
              </p>
            </div>

            <p className="mb-2 text-lg">
              <span className="font-semibold text-white">Warranty:</span>
              <span className="text-gray-300">
                {" "}
                {product.warrantyInformation}
              </span>
            </p>

            <p className="mb-4 text-lg">
              <span className="font-semibold text-white">Shipping:</span>
              <span className="text-gray-300">
                {" "}
                {product.shippingInformation}
              </span>
            </p>

            <div className="mb-4">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="mb-2 mr-2 inline-block rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex space-x-4">
              <MainButton
                label="Compare"
                onClick={() =>
                  navigate("/compare", { state: { selectedProduct: product } })
                }
                className="rounded-lg bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-600"
              />

              <MainButton
                label="Add to Cart"
                onClick={() =>
                  handleAddToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    discountedTotal:
                      product.discountPercentage * product?.price,
                    discountPercentage: product.discountPercentage,
                    quantity: 1,
                    thumbnail: product.thumbnail,
                    total: product.price,
                  })
                }
                className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageDetail;
