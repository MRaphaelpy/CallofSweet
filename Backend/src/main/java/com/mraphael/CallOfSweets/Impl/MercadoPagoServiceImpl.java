package com.mraphael.CallOfSweets.Impl;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.common.IdentificationRequest;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.payment.PaymentCreateRequest;
import com.mercadopago.client.payment.PaymentPayerRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.mraphael.CallOfSweets.DTOs.PaymentRequest;
import com.mraphael.CallOfSweets.DTOs.PaymentResponse;
import com.mraphael.CallOfSweets.Entities.MercadoPagoData;
import com.mraphael.CallOfSweets.Services.MercadoPagoService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MercadoPagoServiceImpl implements MercadoPagoService {

    @Value("${mercadopago.access.token}")
    private String accessToken;

    @PostConstruct
    public void init() {
        MercadoPagoConfig.setAccessToken(accessToken);
    }

    public PaymentResponse processPayment(PaymentRequest request) throws MPException, MPApiException {
        PaymentClient client = new PaymentClient();
        PaymentPayerRequest payer = PaymentPayerRequest.builder()
                .email(request.getCustomerData().getEmail())
                .firstName(request.getCustomerData().getName().split(" ")[0])
                .lastName(extractLastName(request.getCustomerData().getName()))
                .identification(
                        IdentificationRequest.builder()
                                .type("CPF")
                                .number(request.getCustomerData().getCpf().replaceAll("\\D", ""))
                                .build()
                )
                .build();
        MercadoPagoData mpData = request.getMercadoPago();
        PaymentCreateRequest paymentRequest = PaymentCreateRequest.builder()
                .transactionAmount(mpData.getTransactionAmount())
                .token(mpData.getToken())
                .description("Compra na CallOfSweets")
                .installments(mpData.getInstallments())
                .paymentMethodId(mpData.getPaymentMethodId())
                .payer(payer)
                .build();
        Payment payment = client.create(paymentRequest);
        return new PaymentResponse(
                payment.getId(),
                payment.getStatus(),
                payment.getStatusDetail()
        );
    }
    public String extractLastName(String fullName) {
        String[] parts = fullName.split(" ");
        if (parts.length > 1) {
            StringBuilder lastName = new StringBuilder();
            for (int i = 1; i < parts.length; i++) {
                if (i > 1) lastName.append(" ");
                lastName.append(parts[i]);
            }
            return lastName.toString();
        }
        return "";
    }
}
