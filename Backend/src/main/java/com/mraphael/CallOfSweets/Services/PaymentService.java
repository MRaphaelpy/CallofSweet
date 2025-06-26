package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.PaymentDTO;
import com.mraphael.CallOfSweets.Entities.Payment;
import java.util.List;

public interface PaymentService {
    PaymentDTO createPayment(PaymentDTO paymentDTO);
    PaymentDTO getPaymentById(Long id);
    List<PaymentDTO> getAllPayments();
    PaymentDTO updatePayment(Long id, PaymentDTO paymentDTO);
    void deletePayment(Long id);
}