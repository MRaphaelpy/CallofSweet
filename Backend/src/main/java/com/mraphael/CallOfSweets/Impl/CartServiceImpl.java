package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.Entities.Cart;
import com.mraphael.CallOfSweets.Repositories.CartRepository;
import com.mraphael.CallOfSweets.Services.CartService;
import com.mraphael.CallOfSweets.DTOs.CartDTO;
import com.mraphael.CallOfSweets.Mappers.CartMapper;
import com.mraphael.CallOfSweets.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartMapper cartMapper;

    @Override
    public CartDTO createCart(CartDTO cartDTO) {
        Cart cart = cartMapper.toEntity(cartDTO);
        Cart savedCart = cartRepository.save(cart);
        return cartMapper.toDTO(savedCart);
    }

    @Override
    public CartDTO getCartById(int id) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with ID: " + id));
        return cartMapper.toDTO(cart);
    }

    @Override
    public List<CartDTO> getAllCarts() {
        return cartRepository.findAll().stream()
                .map(cartMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CartDTO updateCart(int id, CartDTO cartDTO) {
        Cart existingCart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with ID: " + id));
        cartMapper.map(cartDTO, existingCart);
        Cart updatedCart = cartRepository.save(existingCart);
        return cartMapper.toDTO(updatedCart);
    }

    @Override
    public void deleteCart(int id) {
        if (!cartRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cart not found with ID: " + id);
        }
        cartRepository.deleteById(id);
    }
}