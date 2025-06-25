package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.ReviewDTO;
import com.mraphael.CallOfSweets.Entities.Review;
import java.util.List;

public interface ReviewService {
    ReviewDTO createReview(ReviewDTO reviewDTO);
    ReviewDTO getReviewById(int id);
    List<ReviewDTO> getAllReviews();
    ReviewDTO updateReview(int id, ReviewDTO reviewDTO);
    void deleteReview(int id);
}