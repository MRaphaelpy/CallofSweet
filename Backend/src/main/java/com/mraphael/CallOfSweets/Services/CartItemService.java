package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.CartItemDTO;
import com.mraphael.CallOfSweets.Entities.CartItem;
import java.util.List;

public interface CartItemService {
    CartItemDTO createCartItem(CartItemDTO cartItemDTO);
    CartItemDTO getCartItemById(int id);
    List<CartItemDTO> getAllCartItems();
    CartItemDTO updateCartItem(int id, CartItemDTO cartItemDTO);
    void deleteCartItem(int id);
}