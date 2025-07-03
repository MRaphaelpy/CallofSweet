package com.mraphael.CallOfSweets.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse {
    private Long paymentId;
    private String status;
    private String statusDetail;
    private Long internalPaymentId;

    public PaymentResponse(Long paymentId, String status, String statusDetail) {
        this.paymentId = paymentId;
        this.status = status;
        this.statusDetail = statusDetail;
    }
}
