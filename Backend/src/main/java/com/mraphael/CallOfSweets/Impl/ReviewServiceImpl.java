package com.mraphael.CallOfSweets.Impl;

        import com.mraphael.CallOfSweets.Entities.Review;
        import com.mraphael.CallOfSweets.Repositories.ReviewRepository;
        import com.mraphael.CallOfSweets.Services.ReviewService;
        import com.mraphael.CallOfSweets.DTOs.ReviewDTO;
        import com.mraphael.CallOfSweets.Mappers.ReviewMapper;
        import com.mraphael.CallOfSweets.Exceptions.ResourceNotFoundException;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

        import java.util.List;
        import java.util.stream.Collectors;

        @Service
        public class ReviewServiceImpl implements ReviewService {

            @Autowired
            private ReviewRepository reviewRepository;

            @Autowired
            private ReviewMapper reviewMapper;

            @Override
            public ReviewDTO createReview(ReviewDTO reviewDTO) {
                Review review = reviewMapper.toEntity(reviewDTO);
                Review savedReview = reviewRepository.save(review);
                return reviewMapper.toDTO(savedReview);
            }

            @Override
            public ReviewDTO getReviewById(Long id) {
                Review review = reviewRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Review not found with ID: " + id));
                return reviewMapper.toDTO(review);
            }

            @Override
            public List<ReviewDTO> getAllReviews() {
                return reviewRepository.findAll().stream()
                        .map(reviewMapper::toDTO)
                        .collect(Collectors.toList());
            }

            @Override
            public ReviewDTO updateReview(Long id, ReviewDTO reviewDTO) {
                Review existingReview = reviewRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Review not found with ID: " + id));
                reviewMapper.map(reviewDTO, existingReview);
                Review updatedReview = reviewRepository.save(existingReview);
                return reviewMapper.toDTO(updatedReview);
            }

            @Override
            public void deleteReview(Long id) {
                if (!reviewRepository.existsById(id)) {
                    throw new ResourceNotFoundException("Review not found with ID: " + id);
                }
                reviewRepository.deleteById(id);
            }
        }