package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.Entities.CartItem;
import com.mraphael.CallOfSweets.Repositories.CartItemRepository;
import com.mraphael.CallOfSweets.Services.CartItemService;
import com.mraphael.CallOfSweets.DTOs.CartItemDTO;
import com.mraphael.CallOfSweets.Mappers.CartItemMapper;
import com.mraphael.CallOfSweets.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartItemMapper cartItemMapper;

    @Override
    public CartItemDTO createCartItem(CartItemDTO cartItemDTO) {
        CartItem cartItem = cartItemMapper.toEntity(cartItemDTO);
        CartItem savedCartItem = cartItemRepository.save(cartItem);
        return cartItemMapper.toDTO(savedCartItem);
    }

    @Override
    public CartItemDTO getCartItemById(int id) {
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart Item not found with ID: " + id));
        return cartItemMapper.toDTO(cartItem);
    }

    @Override
    public List<CartItemDTO> getAllCartItems() {
        return cartItemRepository.findAll().stream()
                .map(cartItemMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CartItemDTO updateCartItem(int id, CartItemDTO cartItemDTO) {
        CartItem existingCartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart Item not found with ID: " + id));
        cartItemMapper.map(cartItemDTO, existingCartItem);
        CartItem updatedCartItem = cartItemRepository.save(existingCartItem);
        return cartItemMapper.toDTO(updatedCartItem);
    }

    @Override
    public void deleteCartItem(int id) {
        if (!cartItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cart Item not found with ID: " + id);
        }
        cartItemRepository.deleteById(id);
    }
}