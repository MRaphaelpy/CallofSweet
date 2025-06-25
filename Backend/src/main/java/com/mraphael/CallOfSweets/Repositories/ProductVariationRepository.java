package com.mraphael.CallOfSweets.Repositories;

import com.mraphael.CallOfSweets.Entities.ProductVariation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductVariationRepository extends JpaRepository<ProductVariation, Integer> {
}