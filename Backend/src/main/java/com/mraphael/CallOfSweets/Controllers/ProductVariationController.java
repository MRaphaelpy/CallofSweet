package com.mraphael.CallOfSweets.Controllers;

import com.mraphael.CallOfSweets.DTOs.ProductVariationDTO;
import com.mraphael.CallOfSweets.Services.ProductVariationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/product-variations")
public class ProductVariationController {

    private final ProductVariationService productVariationService;

    @Autowired
    public ProductVariationController(ProductVariationService productVariationService) {
        this.productVariationService = productVariationService;
    }

    @PostMapping
    public ResponseEntity<ProductVariationDTO> createProductVariation(
            @Validated @RequestBody ProductVariationDTO productVariationDTO) {
        ProductVariationDTO createdVariation = productVariationService.createProductVariation(productVariationDTO);
        return new ResponseEntity<>(createdVariation, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductVariationDTO> getProductVariationById(@PathVariable int id) {
        ProductVariationDTO variation = productVariationService.getProductVariationById(id);
        return ResponseEntity.ok(variation);
    }

    @GetMapping
    public ResponseEntity<List<ProductVariationDTO>> getAllProductVariations() {
        List<ProductVariationDTO> variations = productVariationService.getAllProductVariations();
        return ResponseEntity.ok(variations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductVariationDTO> updateProductVariation(
            @PathVariable int id,
            @Validated @RequestBody ProductVariationDTO variationDTO) {
        ProductVariationDTO updatedVariation = productVariationService.updateProductVariation(id, variationDTO);
        return ResponseEntity.ok(updatedVariation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductVariation(@PathVariable int id) {
        productVariationService.deleteProductVariation(id);
        return ResponseEntity.noContent().build();
    }
}