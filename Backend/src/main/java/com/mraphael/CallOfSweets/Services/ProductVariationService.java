package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.ProductVariationDTO;
import com.mraphael.CallOfSweets.Entities.ProductVariation;
import java.util.List;

public interface ProductVariationService {
    ProductVariationDTO createProductVariation(ProductVariationDTO productVariationDTO);
    ProductVariationDTO getProductVariationById(Long id);
    List<ProductVariationDTO> getAllProductVariations();
    ProductVariationDTO updateProductVariation(Long id, ProductVariationDTO productVariationDTO);
    void deleteProductVariation(Long id);
}