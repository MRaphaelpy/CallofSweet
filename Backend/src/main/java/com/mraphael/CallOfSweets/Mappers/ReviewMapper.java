package com.mraphael.CallOfSweets.Mappers;

import com.mraphael.CallOfSweets.DTOs.ReviewDTO;
import com.mraphael.CallOfSweets.Entities.Review;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {
    @Autowired
    private ModelMapper modelMapper;

    public ReviewDTO toDTO(Review review) {
        return modelMapper.map(review, ReviewDTO.class);
    }

    public Review toEntity(ReviewDTO reviewDTO) {
        return modelMapper.map(reviewDTO, Review.class);
    }

    public void map(ReviewDTO reviewDTO, Review review) {
        modelMapper.map(reviewDTO, review);
    }

}