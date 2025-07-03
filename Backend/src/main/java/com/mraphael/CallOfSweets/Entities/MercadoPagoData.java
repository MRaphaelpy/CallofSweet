package com.mraphael.CallOfSweets.Entities;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MercadoPagoData {
    private String token;
    private String paymentMethodId;
    private String issuerId;
    private int installments;
    private BigDecimal transactionAmount;
    private BigDecimal installmentAmount;
}