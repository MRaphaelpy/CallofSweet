package com.mraphael.CallOfSweets.Mappers;

import com.mraphael.CallOfSweets.DTOs.CartItemDTO;
import com.mraphael.CallOfSweets.Entities.CartItem;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class CartItemMapper {
    @Autowired
    private ModelMapper modelMapper;

    public CartItemDTO toDTO(CartItem cartItem) {
        CartItemDTO dto = modelMapper.map(cartItem, CartItemDTO.class);

        // Adicionar campos informativos adicionais
        if (cartItem.getVariation() != null) {
            if (cartItem.getVariation().getProduct() != null) {
                dto.setProductName(cartItem.getVariation().getProduct().getName());
            }

            String details = "";
            if (cartItem.getVariation().getColor() != null) {
                details += "Cor: " + cartItem.getVariation().getColor();
            }
            if (cartItem.getVariation().getSize() != null) {
                details += (details.isEmpty() ? "" : ", ") + "Tamanho: " + cartItem.getVariation().getSize();
            }
            dto.setVariationDetails(details);
        }

        return dto;
    }

    public CartItem toEntity(CartItemDTO cartItemDTO) {
        CartItem entity = modelMapper.map(cartItemDTO, CartItem.class);

        // Garantir que o subtotal seja do tipo BigDecimal
        if (cartItemDTO.getSubtotal() != null) {
            entity.setSubtotal(BigDecimal.valueOf(cartItemDTO.getSubtotal().doubleValue()));
        }

        return entity;
    }
    // CartItemMapper - add this method to your class
    public void map(CartItemDTO cartItemDTO, CartItem cartItem) {
        var variation = cartItem.getVariation();
        var cart = cartItem.getCart();

        modelMapper.map(cartItemDTO, cartItem);

        cartItem.setVariation(variation);
        cartItem.setCart(cart);

        // Garantir que o subtotal seja do tipo BigDecimal
        if (cartItemDTO.getSubtotal() != null) {
            cartItem.setSubtotal(BigDecimal.valueOf(cartItemDTO.getSubtotal().doubleValue()));
        }
    }
}