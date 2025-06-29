package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.Entities.Promotion;
import com.mraphael.CallOfSweets.Repositories.PromotionRepository;
import com.mraphael.CallOfSweets.Services.PromotionService;
import com.mraphael.CallOfSweets.DTOs.PromotionDTO;
import com.mraphael.CallOfSweets.Mappers.PromotionMapper;
import com.mraphael.CallOfSweets.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private PromotionMapper promotionMapper;

    @Override
    public PromotionDTO createPromotion(PromotionDTO promotionDTO) {
        Promotion promotion = promotionMapper.toEntity(promotionDTO);
        Promotion savedPromotion = promotionRepository.save(promotion);
        return promotionMapper.toDTO(savedPromotion);
    }

    @Override
    public PromotionDTO getPromotionById(Long id) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Promotion not found with ID: " + id));
        return promotionMapper.toDTO(promotion);
    }

    @Override
    public List<PromotionDTO> getAllPromotions() {
        return promotionRepository.findAll().stream()
                .map(promotionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PromotionDTO updatePromotion(Long id, PromotionDTO promotionDTO) {
        Promotion existingPromotion = promotionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Promotion not found with ID: " + id));
        promotionMapper.map(promotionDTO, existingPromotion);
        Promotion updatedPromotion = promotionRepository.save(existingPromotion);
        return promotionMapper.toDTO(updatedPromotion);
    }

    @Override
    public void deletePromotion(Long id) {
        if (!promotionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Promotion not found with ID: " + id);
        }
        promotionRepository.deleteById(id);
    }
}