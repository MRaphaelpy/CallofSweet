package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.PaymentDTO;
import com.mraphael.CallOfSweets.DTOs.PaymentRequest;
import com.mraphael.CallOfSweets.DTOs.PaymentResponse;
import com.mraphael.CallOfSweets.Entities.Payment;
import java.util.List;

public interface PaymentService {
    PaymentDTO createPayment(PaymentDTO paymentDTO);
    PaymentDTO getPaymentById(Long id);
    List<PaymentDTO> getAllPayments();
    PaymentDTO updatePayment(Long id, PaymentDTO paymentDTO);
    List<PaymentDTO> getPaymentsByOrderId(Long orderId);
    PaymentResponse processPayment(PaymentRequest paymentRequest);
    void deletePayment(Long id);
}