package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.DTOs.OrderDTO;
import com.mraphael.CallOfSweets.DTOs.OrderItemDTO;
import com.mraphael.CallOfSweets.Entities.*;
import com.mraphael.CallOfSweets.Exceptions.OrderExceptions;
import com.mraphael.CallOfSweets.Exceptions.UserExceptions;
import com.mraphael.CallOfSweets.Mappers.OrderMapper;
import com.mraphael.CallOfSweets.Repositories.OrderRepository;
import com.mraphael.CallOfSweets.Repositories.ProductVariationRepository;
import com.mraphael.CallOfSweets.Repositories.UserRepository;
import com.mraphael.CallOfSweets.Services.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductVariationRepository productVariationRepository;
    private final OrderMapper orderMapper;

    @Autowired
    public OrderServiceImpl(
            OrderRepository orderRepository,
            UserRepository userRepository,
            ProductVariationRepository productVariationRepository,
            OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productVariationRepository = productVariationRepository;
        this.orderMapper = orderMapper;
    }

    @Override
    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        User user = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(() -> UserExceptions.userNotFoundById(orderDTO.getUserId()));

        Order order = new Order();
        order.setUser(user);
        order.setTotalPrice(orderDTO.getTotalPrice());

        validateOrderStatus(orderDTO.getStatus(), order);

        order.setPaymentMethod(orderDTO.getPaymentMethod());
        order.setTrackingCode(orderDTO.getTrackingCode());

        Order savedOrder = orderRepository.save(order);
        List<OrderItem> orderItems = new ArrayList<>();
        List<String> invalidItems = new ArrayList<>();

        for (OrderItemDTO itemDTO : orderDTO.getItems()) {
            processOrderItem(itemDTO, savedOrder, orderItems, invalidItems);
        }

        if (orderItems.isEmpty()) {
            orderRepository.delete(savedOrder);
            throw OrderExceptions.noValidProductVariations(invalidItems);
        }

        savedOrder.setItems(orderItems);
        savedOrder = orderRepository.save(savedOrder);

        return orderMapper.toDTO(savedOrder);
    }

    private void validateOrderStatus(String status, Order order) {
        try {
            order.setStatus(OrderStatus.valueOf(status));
        } catch (IllegalArgumentException e) {
            throw OrderExceptions.invalidOrderStatus(status);
        }
    }

    private void processOrderItem(OrderItemDTO itemDTO, Order savedOrder, List<OrderItem> orderItems, List<String> invalidItems) {
        try {
            Optional<ProductVariation> variationOpt = productVariationRepository.findById(itemDTO.getVariationId());

            if (variationOpt.isPresent()) {
                OrderItem item = new OrderItem();
                item.setOrder(savedOrder);
                item.setVariation(variationOpt.get());

                if (itemDTO.getQuantity() <= 0) {
                    throw OrderExceptions.orderItemValidationFailed(
                            "A quantidade deve ser maior que zero para o item com ID: " + itemDTO.getVariationId());
                }

                item.setQuantity(itemDTO.getQuantity());
                item.setSubtotal(itemDTO.getSubtotal());
                orderItems.add(item);
            } else {
                invalidItems.add("ID da variação do produto: " + itemDTO.getVariationId());
            }
        } catch (Exception e) {
            if (e instanceof OrderExceptions) {
                throw e;
            }
            invalidItems.add("Item com erro: " + itemDTO.getVariationId());
        }
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> OrderExceptions.orderNotFoundById(id));
        return orderMapper.toDTO(order);
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(orderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getOrdersByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> UserExceptions.userNotFoundById(userId));

        List<Order> orders = orderRepository.findAllByUserId(userId);
        return orders.stream()
                .map(orderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> OrderExceptions.orderNotFoundById(id));

        validateOrderStatus(orderDTO.getStatus(), order);

        orderMapper.map(orderDTO, order);
        Order updatedOrder = orderRepository.save(order);
        return orderMapper.toDTO(updatedOrder);
    }

    @Override
    @Transactional
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> OrderExceptions.orderNotFoundById(id));
        orderRepository.delete(order);
    }
}