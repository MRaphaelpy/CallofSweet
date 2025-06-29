package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.PromotionDTO;
import com.mraphael.CallOfSweets.Entities.Promotion;
import java.util.List;

public interface PromotionService {
    PromotionDTO createPromotion(PromotionDTO promotionDTO);
    PromotionDTO getPromotionById(Long id);
    List<PromotionDTO> getAllPromotions();
    PromotionDTO updatePromotion(Long id, PromotionDTO promotionDTO);
    void deletePromotion(Long id);
}