package com.mraphael.CallOfSweets.DTOs;

import lombok.Getter;
import lombok.Setter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductVariationDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String color;
    private String size;
    private Integer stock;
}