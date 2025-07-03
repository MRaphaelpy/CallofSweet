package com.mraphael.CallOfSweets.DTOs;

import com.mraphael.CallOfSweets.Entities.MercadoPagoData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    private String paymentMethod;
    private CustomerData customerData;
    private MercadoPagoData mercadoPago;
    private Long orderId;
}