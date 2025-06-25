package com.mraphael.CallOfSweets.Controllers;

import com.mraphael.CallOfSweets.DTOs.PromotionDTO;
import com.mraphael.CallOfSweets.Services.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/promotions")
public class PromotionController {

    private final PromotionService promotionService;

    @Autowired
    public PromotionController(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @PostMapping
    public ResponseEntity<PromotionDTO> createPromotion(@Validated @RequestBody PromotionDTO promotionDTO) {
        PromotionDTO createdPromotion = promotionService.createPromotion(promotionDTO);
        return new ResponseEntity<>(createdPromotion, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PromotionDTO> getPromotionById(@PathVariable int id) {
        PromotionDTO promotion = promotionService.getPromotionById(id);
        return ResponseEntity.ok(promotion);
    }

    @GetMapping
    public ResponseEntity<List<PromotionDTO>> getAllPromotions() {
        List<PromotionDTO> promotions = promotionService.getAllPromotions();
        return ResponseEntity.ok(promotions);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromotionDTO> updatePromotion(
            @PathVariable int id,
            @Validated @RequestBody PromotionDTO promotionDTO) {
        PromotionDTO promotion = promotionService.updatePromotion(id, promotionDTO);
        return ResponseEntity.ok(promotion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable int id) {
        promotionService.deletePromotion(id);
        return ResponseEntity.noContent().build();
    }
}