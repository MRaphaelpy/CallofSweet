package com.mraphael.CallOfSweets.DTOs;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class CartItemDTO {
    private Long id;
    private Long cartId;
    private Long variationId;
    private Integer quantity;
    private BigDecimal subtotal;
    private String productName;
    private String variationDetails;
}