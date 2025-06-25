package com.mraphael.CallOfSweets.Mappers;

import com.mraphael.CallOfSweets.DTOs.ProductDTO;
import com.mraphael.CallOfSweets.Entities.Product;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Component
public class ProductMapper {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductVariationMapper variationMapper;

    @Autowired
    private ReviewMapper reviewMapper;

    public ProductDTO toDTO(Product product) {
        ProductDTO dto = modelMapper.map(product, ProductDTO.class);


        if (product.getVariations() != null) {
            dto.setVariations(product.getVariations().stream()
                    .map(variationMapper::toDTO)
                    .collect(Collectors.toList()));
        }

        if (product.getReviews() != null) {
            dto.setReviews(product.getReviews().stream()
                    .map(reviewMapper::toDTO)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    public Product toEntity(ProductDTO productDTO) {
        Product entity = modelMapper.map(productDTO, Product.class);

        if (productDTO.getPrice() != null) {
            entity.setPrice(BigDecimal.valueOf(productDTO.getPrice().doubleValue()));
        }

        return entity;
    }

    public void map(ProductDTO productDTO, Product product) {

        var variations = product.getVariations();
        var reviews = product.getReviews();

        modelMapper.map(productDTO, product);

        product.setVariations(variations);
        product.setReviews(reviews);

        if (productDTO.getPrice() != null) {
            product.setPrice(BigDecimal.valueOf(productDTO.getPrice().doubleValue()));
        }
    }
}