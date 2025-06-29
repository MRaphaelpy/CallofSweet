package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.CartDTO;
import com.mraphael.CallOfSweets.Entities.Cart;
import java.util.List;

public interface CartService {
    CartDTO createCart(CartDTO cartDTO);
    CartDTO getCartById(Long id);
    List<CartDTO> getAllCarts();
    CartDTO updateCart(Long id, CartDTO cartDTO);
    void deleteCart(Long id);
    CartDTO getCartByUserId(Long userId);
}