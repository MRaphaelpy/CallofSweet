package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.ProductDTO;
import com.mraphael.CallOfSweets.Entities.Product;
import java.util.List;

public interface ProductService {
    ProductDTO createProduct(ProductDTO productDTO);
    ProductDTO getProductById(Long id);
    List<ProductDTO> getAllProducts();
    ProductDTO updateProduct(Long id, ProductDTO productDTO);
    void deleteProduct(Long id);
}