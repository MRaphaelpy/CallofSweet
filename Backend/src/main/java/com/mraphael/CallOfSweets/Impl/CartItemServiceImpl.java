package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.DTOs.CartItemDTO;
import com.mraphael.CallOfSweets.Entities.Cart;
import com.mraphael.CallOfSweets.Entities.CartItem;
import com.mraphael.CallOfSweets.Entities.Product;
import com.mraphael.CallOfSweets.Entities.ProductVariation;
import com.mraphael.CallOfSweets.Exceptions.ResourceNotFoundException;
import com.mraphael.CallOfSweets.Mappers.CartItemMapper;
import com.mraphael.CallOfSweets.Repositories.CartItemRepository;
import com.mraphael.CallOfSweets.Repositories.CartRepository;
import com.mraphael.CallOfSweets.Repositories.ProductRepository;
import com.mraphael.CallOfSweets.Repositories.ProductVariationRepository;
import com.mraphael.CallOfSweets.Services.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final ProductVariationRepository productVariationRepository;
    private final CartItemMapper cartItemMapper;

    @Autowired
    public CartItemServiceImpl(
            CartItemRepository cartItemRepository,
            CartRepository cartRepository,
            ProductRepository productRepository,
            ProductVariationRepository productVariationRepository,
            CartItemMapper cartItemMapper) {
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.productVariationRepository = productVariationRepository;
        this.cartItemMapper = cartItemMapper;
    }


    @Override
    public CartItemDTO createCartItem(CartItemDTO cartItemDTO) {
        if (cartItemDTO.getCartId() == null) {
            throw new IllegalArgumentException("Cart ID cannot be null");
        }
        Cart cart = cartRepository.findById(cartItemDTO.getCartId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with ID: " + cartItemDTO.getCartId()));

        ProductVariation variation = null;
        Product product = null;

        if (cartItemDTO.getVariationId() != null) {
            try {
                variation = productVariationRepository.findById(cartItemDTO.getVariationId())
                        .orElse(null);
            } catch (Exception e) {
            }
        }

        if (variation == null && cartItemDTO.getProductId() != null) {
            try {

                product = productRepository.findById(cartItemDTO.getProductId())
                        .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + cartItemDTO.getProductId()));

                Optional<ProductVariation> defaultVariation = productVariationRepository.findFirstByProductId(product.getId());
                if (defaultVariation.isPresent()) {
                    variation = defaultVariation.get();
                } else {
                    variation = new ProductVariation();
                    variation.setProduct(product);
                    variation.setPrice(cartItemDTO.getPrice());
                    variation.setStock(100);
                    variation = productVariationRepository.save(variation);
                }
            } catch (Exception e) {
                throw new ResourceNotFoundException("Could not find or create product variation");
            }
        }

        if (variation == null) {
            throw new ResourceNotFoundException("Could not find or create product variation");
        }

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setVariation(variation);
        cartItem.setQuantity(cartItemDTO.getQuantity());

        BigDecimal price = cartItemDTO.getPrice() != null ?
                cartItemDTO.getPrice() :
                variation.getPrice();


        BigDecimal subtotal = price.multiply(new BigDecimal(cartItemDTO.getQuantity()));
        cartItem.setSubtotal(subtotal);


        CartItem savedCartItem = cartItemRepository.save(cartItem);
        CartItemDTO responseDTO = cartItemMapper.toDTO(savedCartItem);

        if (product == null && variation.getProduct() != null) {
            product = variation.getProduct();
        }

        if (product != null) {
            responseDTO.setName(product.getName());
            responseDTO.setName(product.getName());
            responseDTO.setImage(product.getImageUrl());
        }

        responseDTO.setPrice(price);

        return responseDTO;
    }

    @Override
    public CartItemDTO getCartItemById(Long id) {
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found with ID: " + id));

        CartItemDTO dto = cartItemMapper.toDTO(cartItem);
        Product product = cartItem.getVariation().getProduct();
        dto.setName(product.getName());
        dto.setPrice(cartItem.getVariation().getPrice());
        dto.setImage(product.getImageUrl());

        return dto;
    }

    @Override
    public List<CartItemDTO> getCartItemsByCartId(Long cartId) {
        List<CartItem> cartItems = cartItemRepository.findByCartId(cartId);
        return cartItems.stream()
                .map(item -> {
                    CartItemDTO dto = cartItemMapper.toDTO(item);

                    Product product = item.getVariation().getProduct();
                    dto.setName(product.getName());
                    dto.setPrice(item.getVariation().getPrice());
                    dto.setImage(product.getImageUrl());

                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public CartItemDTO updateCartItem(Long id, CartItemDTO cartItemDTO) {
        CartItem existingItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found with ID: " + id));

        if (cartItemDTO.getCartId() != null &&
                !cartItemDTO.getCartId().equals(existingItem.getCart().getId())) {
            Cart cart = cartRepository.findById(cartItemDTO.getCartId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cart not found with ID: " + cartItemDTO.getCartId()));
            existingItem.setCart(cart);
        }

        ProductVariation variation = existingItem.getVariation();
        if (cartItemDTO.getVariationId() != null &&
                !cartItemDTO.getVariationId().equals(existingItem.getVariation().getId())) {
            variation = productVariationRepository.findById(cartItemDTO.getVariationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product variation not found with ID: " + cartItemDTO.getVariationId()));
            existingItem.setVariation(variation);
        } else if (cartItemDTO.getProductId() != null) {
            Product product = productRepository.findById(cartItemDTO.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + cartItemDTO.getProductId()));

            Optional<ProductVariation> defaultVariation = productVariationRepository.findFirstByProductId(product.getId());
            if (defaultVariation.isPresent()) {
                variation = defaultVariation.get();
                existingItem.setVariation(variation);
            }
        }

        if (cartItemDTO.getQuantity() != null) {
            existingItem.setQuantity(cartItemDTO.getQuantity());

            BigDecimal price = cartItemDTO.getPrice() != null ?
                    cartItemDTO.getPrice() :
                    existingItem.getVariation().getPrice();

            BigDecimal subtotal = price.multiply(new BigDecimal(cartItemDTO.getQuantity()));
            existingItem.setSubtotal(subtotal);
        }


        CartItem updatedItem = cartItemRepository.save(existingItem);
        CartItemDTO responseDTO = cartItemMapper.toDTO(updatedItem);
        Product product = updatedItem.getVariation().getProduct();
        responseDTO.setName(product.getName());
        responseDTO.setPrice(updatedItem.getVariation().getPrice());
        responseDTO.setImage(product.getImageUrl());

        return responseDTO;
    }

    @Override
    public void deleteCartItem(Long id) {
        if (!cartItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("CartItem not found with ID: " + id);
        }
        cartItemRepository.deleteById(id);
    }
}