package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.ReviewDTO;
import com.mraphael.CallOfSweets.Entities.Review;
import java.util.List;

public interface ReviewService {
    ReviewDTO createReview(ReviewDTO reviewDTO);
    ReviewDTO getReviewById(Long id);
    List<ReviewDTO> getAllReviews();
    ReviewDTO updateReview(Long id, ReviewDTO reviewDTO);
    void deleteReview(Long id);
}