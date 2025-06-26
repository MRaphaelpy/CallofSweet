package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.CartItemDTO;
import java.util.List;

public interface CartItemService {
    CartItemDTO createCartItem(CartItemDTO cartItemDTO);
    CartItemDTO getCartItemById(Long id);
    List<CartItemDTO> getCartItemsByCartId(Long cartId);
    default List<CartItemDTO> getAllCartItems() {
        throw new UnsupportedOperationException("Metodo nao implemntado");
    }
    CartItemDTO updateCartItem(Long id, CartItemDTO cartItemDTO);
    void deleteCartItem(Long id);
}