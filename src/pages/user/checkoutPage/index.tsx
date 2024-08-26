import React, { useState } from "react";

const CheckoutPage: React.FC = () => {
  // Define the type for payment status
  const [paymentStatus, setPaymentStatus] = useState<"success" | "failure" | null>(null);

  // Specify the type of 'status' parameter
  const handlePayment = (status: "success" | "failure") => {
    setPaymentStatus(status);
  };

  return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        {!paymentStatus && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Complete Your Purchase</h1>
              <button
                  onClick={() => handlePayment("success")}
                  className="py-2 px-6 mr-4 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Simulate Successful Payment
              </button>
              <button
                  onClick={() => handlePayment("failure")}
                  className="py-2 px-6 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Simulate Failed Payment
              </button>
            </div>
        )}

        {paymentStatus === "success" && (
            <div className="bg-white p-8 rounded shadow-lg text-center">
              <h1 className="text-2xl font-bold mb-4">Thank you for your purchase!</h1>
              <p>Your order is confirmed, and we'll notify you once it's on the way.</p>
            </div>
        )}

        {paymentStatus === "failure" && (
            <div className="bg-white p-8 rounded shadow-lg text-center">
              <p className="text-red-600">We're sorry, but your payment didn't go through.</p>
              <p>Please try again or use a different payment method.</p>
            </div>
        )}
      </div>
  );
};

export default CheckoutPage;
