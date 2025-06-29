package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.Entities.Cart;
import com.mraphael.CallOfSweets.Entities.User;
import com.mraphael.CallOfSweets.Repositories.CartRepository;
import com.mraphael.CallOfSweets.Repositories.UserRepository;
import com.mraphael.CallOfSweets.Services.CartService;
import com.mraphael.CallOfSweets.DTOs.CartDTO;
import com.mraphael.CallOfSweets.Mappers.CartMapper;
import com.mraphael.CallOfSweets.Exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final CartMapper cartMapper;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, UserRepository userRepository, CartMapper cartMapper) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.cartMapper = cartMapper;
    }

    @Override
    public CartDTO createCart(CartDTO cartDTO) {

        if (cartDTO.getUserId() == null) {
            throw new IllegalArgumentException("User ID cannot be null when creating a cart");
        }

        User user = userRepository.findById(cartDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + cartDTO.getUserId()));


        Cart cart = cartMapper.toEntity(cartDTO);
        cart.setUser(user);
        cart.setItems(new ArrayList<>());

        Cart savedCart = cartRepository.save(cart);
        return cartMapper.toDTO(savedCart);
    }

    @Override
    public CartDTO getCartById(Long id) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with ID: " + id));
        return cartMapper.toDTO(cart);
    }

    @Override
    public CartDTO getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No cart found for user with ID: " + userId));
        return cartMapper.toDTO(cart);
    }

    @Override
    public List<CartDTO> getAllCarts() {
        return cartRepository.findAll().stream()
                .map(cartMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CartDTO updateCart(Long id, CartDTO cartDTO) {
        Cart existingCart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with ID: " + id));

        if (cartDTO.getUserId() != null &&
                (existingCart.getUser() == null || !cartDTO.getUserId().equals(existingCart.getUser().getId()))) {
            User user = userRepository.findById(cartDTO.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + cartDTO.getUserId()));
            existingCart.setUser(user);
        }

        cartMapper.map(cartDTO, existingCart);
        Cart updatedCart = cartRepository.save(existingCart);
        return cartMapper.toDTO(updatedCart);
    }

    @Override
    public void deleteCart(Long id) {
        if (!cartRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cart not found with ID: " + id);
        }
        cartRepository.deleteById(id);
    }
}