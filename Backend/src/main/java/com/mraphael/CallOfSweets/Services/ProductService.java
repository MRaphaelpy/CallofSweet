package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.ProductDTO;
import com.mraphael.CallOfSweets.Entities.Product;
import java.util.List;

public interface ProductService {
    ProductDTO createProduct(ProductDTO productDTO);
    ProductDTO getProductById(int id);
    List<ProductDTO> getAllProducts();
    ProductDTO updateProduct(int id, ProductDTO productDTO);
    void deleteProduct(int id);
}