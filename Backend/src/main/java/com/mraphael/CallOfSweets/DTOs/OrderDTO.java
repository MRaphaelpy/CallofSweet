package com.mraphael.CallOfSweets.DTOs;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
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