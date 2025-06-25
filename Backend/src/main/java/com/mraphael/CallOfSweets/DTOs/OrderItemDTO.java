package com.mraphael.CallOfSweets.DTOs;

import lombok.Data;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class OrderItemDTO {
    private Long id;
    private Long orderId;
    private Long variationId;
    private Integer quantity;
    private BigDecimal subtotal;
    private String productName;
    private String variationDetails;
}