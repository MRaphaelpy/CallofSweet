package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.CartDTO;
import com.mraphael.CallOfSweets.Entities.Cart;
import java.util.List;

public interface CartService {
    CartDTO createCart(CartDTO cartDTO);
    CartDTO getCartById(int id);
    List<CartDTO> getAllCarts();
    CartDTO updateCart(int id, CartDTO cartDTO);
    void deleteCart(int id);
}