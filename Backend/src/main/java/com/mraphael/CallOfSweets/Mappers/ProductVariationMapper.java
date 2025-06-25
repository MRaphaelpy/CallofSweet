package com.mraphael.CallOfSweets.Mappers;

import com.mraphael.CallOfSweets.DTOs.ProductVariationDTO;
import com.mraphael.CallOfSweets.Entities.ProductVariation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductVariationMapper {
    @Autowired
    private ModelMapper modelMapper;

    public ProductVariationDTO toDTO(ProductVariation productVariation) {
        return modelMapper.map(productVariation, ProductVariationDTO.class);
    }

    public ProductVariation toEntity(ProductVariationDTO productVariationDTO) {
        return modelMapper.map(productVariationDTO, ProductVariation.class);
    }
    public void map(ProductVariationDTO productVariationDTO, ProductVariation productVariation) {
        var product = productVariation.getProduct();

        modelMapper.map(productVariationDTO, productVariation);

        productVariation.setProduct(product);
    }
}