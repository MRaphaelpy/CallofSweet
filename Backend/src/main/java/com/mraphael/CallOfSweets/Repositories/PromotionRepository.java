package com.mraphael.CallOfSweets.Repositories;

import com.mraphael.CallOfSweets.Entities.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
}