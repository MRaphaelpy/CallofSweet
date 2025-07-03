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
		setIsProcessing(true);
		setError(null);

		try {
			const result = await simulatePaymentProcessing(paymentData);
			setTransactionId(result.transactionId);
			onSuccess(result);
		} catch (err) {
			setError(err.message || "An unexpected error occurred");
			onError(err);
		} finally {
			setIsProcessing(false);
		}
	};

	const simulatePaymentProcessing = (paymentData) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (Math.random() < 0.9) {
					const fakeTransactionId = `txn_${Math.random().toString(36).substr(2, 9)}`;
					resolve({
						success: true,
						transactionId: fakeTransactionId,
						message: "Payment processed successfully",
					});
				} else {
					const errorMessage = "Payment processing failed. Please try again.";
					reject(new Error(errorMessage));
				}
			}, 2000);
		});
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