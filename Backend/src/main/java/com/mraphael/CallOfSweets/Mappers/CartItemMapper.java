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
        CartItemDTO dto = new CartItemDTO();

        dto.setId(cartItem.getId());
        dto.setQuantity(cartItem.getQuantity());
        dto.setSubtotal(cartItem.getSubtotal());

        if (cartItem.getCart() != null) {
            dto.setCartId(cartItem.getCart().getId());
        }

        if (cartItem.getVariation() != null) {
            dto.setVariationId(cartItem.getVariation().getId());
            dto.setPrice(cartItem.getVariation().getPrice());

            if (cartItem.getVariation().getProduct() != null) {
                var product = cartItem.getVariation().getProduct();
                dto.setProductId(product.getId());
                dto.setName(product.getName());
                dto.setImage(product.getImageUrl());
                dto.setName(product.getName());
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
        CartItem entity = new CartItem();
        entity.setId(cartItemDTO.getId());
        entity.setQuantity(cartItemDTO.getQuantity());

        if (cartItemDTO.getPrice() != null && cartItemDTO.getQuantity() != null) {
            BigDecimal subtotal = cartItemDTO.getPrice().multiply(new BigDecimal(cartItemDTO.getQuantity()));
            entity.setSubtotal(subtotal);
        } else if (cartItemDTO.getSubtotal() != null) {
            entity.setSubtotal(cartItemDTO.getSubtotal());
        }
        return entity;
    }

    public void map(CartItemDTO cartItemDTO, CartItem cartItem) {

        var variation = cartItem.getVariation();
        var cart = cartItem.getCart();


        if (cartItemDTO.getQuantity() != null) {
            cartItem.setQuantity(cartItemDTO.getQuantity());
        }

        if (cartItemDTO.getPrice() != null && cartItemDTO.getQuantity() != null) {
            BigDecimal subtotal = cartItemDTO.getPrice().multiply(new BigDecimal(cartItemDTO.getQuantity()));
            cartItem.setSubtotal(subtotal);
        } else if (cartItemDTO.getSubtotal() != null) {
            cartItem.setSubtotal(cartItemDTO.getSubtotal());
        }
        cartItem.setVariation(variation);
        cartItem.setCart(cart);
    }
}