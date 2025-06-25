package com.mraphael.CallOfSweets.DTOs;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private boolean isActive;
    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private String brand;
    private String imageUrl;
    private Float rating;
    private Date createdAt;
    private List<ProductVariationDTO> variations;
    private List<ReviewDTO> reviews;
}
