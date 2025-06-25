package com.mraphael.CallOfSweets.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class OrderDTO {
    private Long id;
    private Long userId;
    private String userName;
    private BigDecimal totalPrice;
    private String status;
    private String paymentMethod;
    private String trackingCode;
    private Date createdAt;
    private List<OrderItemDTO> items;
    private PaymentDTO payment;
}