import React, { useState } from "react";

const CheckoutPage: React.FC = () => {
  // Define the type for payment status
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "failure" | null
  >(null);

  // Specify the type of 'status' parameter
  const handlePayment = (status: "success" | "failure") => {
    setPaymentStatus(status);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      {!paymentStatus && (
        <div>
          <h1 className="mb-6 text-3xl font-bold">Complete Your Purchase</h1>
          <button
            onClick={() => handlePayment("success")}
            className="mr-4 rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600"
          >
            Simulate Successful Payment
          </button>
          <button
            onClick={() => handlePayment("failure")}
            className="rounded bg-red-500 px-6 py-2 text-white hover:bg-red-600"
          >
            Simulate Failed Payment
          </button>
        </div>
      )}

      {paymentStatus === "success" && (
        <div className="rounded bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 text-2xl font-bold">
            Thank you for your purchase!
          </h1>
          <p>
            Your order is confirmed, and we'll notify you once it's on the way.
          </p>
        </div>
      )}

      {paymentStatus === "failure" && (
        <div className="rounded bg-white p-8 text-center shadow-lg">
          <p className="text-red-600">
            We're sorry, but your payment didn't go through.
          </p>
          <p>Please try again or use a different payment method.</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
