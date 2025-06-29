package com.mraphael.CallOfSweets.Repositories;

import com.mraphael.CallOfSweets.Entities.ProductVariation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductVariationRepository extends JpaRepository<ProductVariation, Long> {
    Optional<ProductVariation> findFirstByProductId(Long productId);
}