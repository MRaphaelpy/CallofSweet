package com.mraphael.CallOfSweets.DTOs;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Data
public class CartItemDTO {
    private Long id;
    private Long cartId;
    private Long productId;
    private Long variationId;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal subtotal;
    private String name;
    private String image;
    private String variationDetails;
}