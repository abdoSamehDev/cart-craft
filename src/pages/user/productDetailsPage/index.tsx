import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainButton } from '../../../components/Buttons';
import StarRating from '../../../components/StarRating';
import { useProducts } from '../../../hooks/useProducts';

const ProductPageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { product, fetchProductById, loading, error } = useProducts();

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id));
    }
  }, [id, fetchProductById]);

  if (loading) {
    return    <div className="col-span-full flex justify-center items-center">
    <div className="w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  const discountedPrice = (
    product.price - (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="container mx-auto p-4 bg-[#1A202C] rounded-lg shadow-md">
      <div className="mb-4 sticky top-6 z-10">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.thumbnail || 'https://via.placeholder.com/300'}
            alt={product.title}
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-white mb-4">{product.title}</h1>
          <p className="text-lg text-gray-300 mb-4">{product.description}</p>

          <StarRating rating={product.rating} />

          <div className="text-3xl font-semibold text-primary mb-4">
            ${discountedPrice}{' '}
            <span className="line-through text-gray-500 text-lg ml-2">
              ${product.price}
            </span>
          </div>

          <p className={`text-white-400 font-semibold mb-4`}>
            {product.availabilityStatus} ({product.stock} in stock)
          </p>

          <div className="text-lg mb-2">
            <p className="mb-2">
              <span className="font-semibold text-white">Brand:</span> 
              <span className="text-gray-300"> {product.brand}</span>
            </p>
            <p className="mb-4">
              <span className="font-semibold text-white">SKU:</span> 
              <span className="text-gray-300"> {product.sku}</span>
            </p>
          </div>

          <div className="text-lg mb-2">
            <p className="mb-2">
              <span className="font-semibold text-white">Dimensions:</span> 
              <span className="text-gray-300"> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</span>
            </p>
            <p className="mb-4">
              <span className="font-semibold text-white">Weight:</span> 
              <span className="text-gray-300"> {product.weight} g</span>
            </p>
          </div>

          <p className="text-lg mb-2">
            <span className="font-semibold text-white">Warranty:</span> 
            <span className="text-gray-300"> {product.warrantyInformation}</span>
          </p>

          <p className="text-lg mb-4">
            <span className="font-semibold text-white">Shipping:</span> 
            <span className="text-gray-300"> {product.shippingInformation}</span>
          </p>

          <div className="mb-4">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-secondary rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex space-x-4">
            <MainButton
              label="Compare"
              onClick={() => navigate('/compare', { state: { selectedProduct: product } })}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
            />

            <MainButton
              label="Add to Cart"
              onClick={() => navigate('/cart')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageDetail;
