package com.mraphael.CallOfSweets.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(nullable = false, length = 50)
    private String paymentMethod;

    @Column(unique = true, length = 100)
    private String transactionId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentStatus status;

    @Column(length = 100)
    private String payerEmail;

    @Column(length = 100)
    private String payerName;

    @Column
    private Integer installments;

    @Column(columnDefinition = "TEXT")
    private String details;

    public Payment(Order order, String paymentMethod, String transactionId, BigDecimal amount, PaymentStatus status) {
        this.order = order;
        this.paymentMethod = paymentMethod;
        this.transactionId = transactionId;
        this.amount = amount;
        this.status = status;
    }

    public Payment(Order order, String paymentMethod, String transactionId,
                   BigDecimal amount, PaymentStatus status,
                   String payerEmail, String payerName, Integer installments) {
        this(order, paymentMethod, transactionId, amount, status);
        this.payerEmail = payerEmail;
        this.payerName = payerName;
        this.installments = installments;
    }
}