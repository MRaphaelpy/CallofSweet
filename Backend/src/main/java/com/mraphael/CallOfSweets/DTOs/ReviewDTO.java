package com.mraphael.CallOfSweets.DTOs;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class ReviewDTO {
    private Long id;
    private Long userId;
    private String userName;
    private Long productId;
    private String productName;
    private Integer rating;
    private String comment;
    private Date createdAt;
}