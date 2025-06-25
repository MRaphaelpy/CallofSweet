package com.mraphael.CallOfSweets.Mappers;

import com.mraphael.CallOfSweets.DTOs.CartDTO;
import com.mraphael.CallOfSweets.Entities.Cart;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class CartMapper {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CartItemMapper cartItemMapper;

    public CartDTO toDTO(Cart cart) {
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        if (cart.getItems() != null) {
            cartDTO.setItems(cart.getItems().stream()
                    .map(cartItemMapper::toDTO)
                    .collect(Collectors.toList()));
        }

        return cartDTO;
    }

    public Cart toEntity(CartDTO cartDTO) {
        return modelMapper.map(cartDTO, Cart.class);

    }
    public void map(CartDTO cartDTO, Cart cart) {
        var items = cart.getItems();
        var user = cart.getUser();

        modelMapper.map(cartDTO, cart);

        cart.setItems(items);
        cart.setUser(user);
    }
}