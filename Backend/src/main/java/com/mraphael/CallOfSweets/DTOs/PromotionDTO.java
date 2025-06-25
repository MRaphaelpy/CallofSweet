package com.mraphael.CallOfSweets.DTOs;

import lombok.Data;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class PromotionDTO {
    private Long id;
    private String name;
    private BigDecimal discountPercentage;
    private Date startDate;
    private Date endDate;
    private Boolean isActive;
    private List<Long> productIds;
}