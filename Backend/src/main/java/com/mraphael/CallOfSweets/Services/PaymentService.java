package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.PaymentDTO;
import com.mraphael.CallOfSweets.Entities.Payment;
import java.util.List;

public interface PaymentService {
    PaymentDTO createPayment(PaymentDTO paymentDTO);
    PaymentDTO getPaymentById(int id);
    List<PaymentDTO> getAllPayments();
    PaymentDTO updatePayment(int id, PaymentDTO paymentDTO);
    void deletePayment(int id);
}