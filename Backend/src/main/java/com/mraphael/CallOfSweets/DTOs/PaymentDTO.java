package com.mraphael.CallOfSweets.DTOs;

import lombok.Data;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class PaymentDTO {
    private Long id;
    private Long orderId;
    private String paymentMethod;
    private String transactionId;
    private BigDecimal amount;
    private String status;
}