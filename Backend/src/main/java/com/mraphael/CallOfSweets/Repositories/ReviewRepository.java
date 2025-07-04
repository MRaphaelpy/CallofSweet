package com.mraphael.CallOfSweets.Repositories;

import com.mraphael.CallOfSweets.Entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}