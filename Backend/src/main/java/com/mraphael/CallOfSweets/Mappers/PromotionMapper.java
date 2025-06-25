package com.mraphael.CallOfSweets.Mappers;

import com.mraphael.CallOfSweets.DTOs.PromotionDTO;
import com.mraphael.CallOfSweets.Entities.Promotion;
import com.mraphael.CallOfSweets.Entities.Product;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class PromotionMapper {
    @Autowired
    private ModelMapper modelMapper;

    public PromotionDTO toDTO(Promotion promotion) {
        PromotionDTO dto = modelMapper.map(promotion, PromotionDTO.class);

        if (promotion.getProducts() != null) {
            dto.setProductIds(promotion.getProducts().stream()
                    .map(Product::getId)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    public Promotion toEntity(PromotionDTO promotionDTO) {
        Promotion entity = modelMapper.map(promotionDTO, Promotion.class);


        if (promotionDTO.getDiscountPercentage() != null) {
            entity.setDiscountPercentage(BigDecimal.valueOf(promotionDTO.getDiscountPercentage().doubleValue()));
        }

        return entity;
    }

    public void map(PromotionDTO promotionDTO, Promotion promotion) {

        var products = promotion.getProducts();

        modelMapper.map(promotionDTO, promotion);

        promotion.setProducts(products);

        if (promotionDTO.getDiscountPercentage() != null) {
            promotion.setDiscountPercentage(BigDecimal.valueOf(promotionDTO.getDiscountPercentage().doubleValue()));
        }
    }
}