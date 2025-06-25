
import { useState } from "react";

const usePayment = (
  initialAmount = 0,
  onSuccess = () => {},
  onError = () => {}
) => {
  const [amount, setAmount] = useState(initialAmount);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const processPayment = async (paymentData) => {
    try {
      setIsProcessing(true);
      setError(null);

      
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          
          if (Math.random() < 0.9) {
            const fakeTransactionId = `txn_${Math.random()
              .toString(36)
              .substr(2, 9)}`;
            setTransactionId(fakeTransactionId);
            resolve({
              success: true,
              transactionId: fakeTransactionId,
              message: "Payment processed successfully",
            });
            onSuccess({
              transactionId: fakeTransactionId,
              method: paymentMethod,
              amount,
              data: paymentData,
            });
          } else {
            const errorMessage = "Payment processing failed. Please try again.";
            setError(errorMessage);
            reject(new Error(errorMessage));
            onError(new Error(errorMessage));
          }
          setIsProcessing(false);
        }, 2000); 
      });
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      setIsProcessing(false);
      onError(err);
      throw err;
    }
  };

  const resetPayment = () => {
    setPaymentMethod(null);
    setError(null);
    setTransactionId(null);
  };

  return {
    amount,
    setAmount,
    paymentMethod,
    setPaymentMethod,
    isProcessing,
    error,
    transactionId,
    processPayment,
    resetPayment,
  };
};

export default usePayment;
    