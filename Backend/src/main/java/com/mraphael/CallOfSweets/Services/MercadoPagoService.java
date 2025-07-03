package com.mraphael.CallOfSweets.Services;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mraphael.CallOfSweets.DTOs.PaymentRequest;
import com.mraphael.CallOfSweets.DTOs.PaymentResponse;
public interface MercadoPagoService{
     PaymentResponse processPayment(PaymentRequest request) throws MPException, MPApiException;
     String extractLastName(String fullName);
}