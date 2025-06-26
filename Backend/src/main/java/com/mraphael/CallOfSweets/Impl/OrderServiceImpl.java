package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.DTOs.OrderItemDTO;
import com.mraphael.CallOfSweets.Entities.*;
import com.mraphael.CallOfSweets.Repositories.OrderRepository;
import com.mraphael.CallOfSweets.Repositories.ProductVariationRepository;
import com.mraphael.CallOfSweets.Repositories.UserRepository;
import com.mraphael.CallOfSweets.Services.OrderService;
import com.mraphael.CallOfSweets.DTOs.OrderDTO;
import com.mraphael.CallOfSweets.Mappers.OrderMapper;
import com.mraphael.CallOfSweets.Exceptions.OrderNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductVariationRepository productVariationRepository;

    @Autowired
    public OrderServiceImpl(
            OrderRepository orderRepository,
            UserRepository userRepository,
            ProductVariationRepository productVariationRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productVariationRepository = productVariationRepository;
    }

    @Override
    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {

        User user = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found with id: " + orderDTO.getUserId()));

        Order order = new Order();
        order.setUser(user);
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setStatus(OrderStatus.valueOf(orderDTO.getStatus()));
        order.setPaymentMethod(orderDTO.getPaymentMethod());
        order.setTrackingCode(orderDTO.getTrackingCode());

        Order savedOrder = orderRepository.save(order);
        List<OrderItem> orderItems = new ArrayList<>();
        List<String> invalidItems = new ArrayList<>();

        for (OrderItemDTO itemDTO : orderDTO.getItems()) {
            try {
                Optional<ProductVariation> variationOpt = productVariationRepository.findById(Math.toIntExact(itemDTO.getVariationId()));

                if (variationOpt.isPresent()) {
                    OrderItem item = new OrderItem();
                    item.setOrder(savedOrder);
                    item.setVariation(variationOpt.get());
                    item.setQuantity(itemDTO.getQuantity());
                    item.setSubtotal(itemDTO.getSubtotal());
                    orderItems.add(item);
                } else {
                    invalidItems.add("Product variation ID: " + itemDTO.getVariationId());
                }
            } catch (Exception e) {

                invalidItems.add("Item with error: " + itemDTO.getVariationId());
            }
        }

        if (orderItems.isEmpty()) {
            orderRepository.delete(savedOrder);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "No valid product variations found in the order. Invalid IDs: " + String.join(", ", invalidItems));
        }

        savedOrder.setItems(orderItems);
        savedOrder = orderRepository.save(savedOrder);

        return mapToDTO(savedOrder);
    }


    @Override
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Order not found with id: " + id));
        return mapToDTO(order);
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    @Override
    public List<OrderDTO> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findAllByUserId(userId);
        if (orders.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No orders found for user with id: " + userId);
        }
        return orders.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
        Order order = orderRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Order not found with id: " + id));


        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setStatus(OrderStatus.valueOf(orderDTO.getStatus()));
        order.setPaymentMethod(orderDTO.getPaymentMethod());
        order.setTrackingCode(orderDTO.getTrackingCode());

        Order updatedOrder = orderRepository.save(order);
        return mapToDTO(updatedOrder);
    }

    @Override
    @Transactional
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Order not found with id: " + id));
        orderRepository.delete(order);
    }

    private OrderDTO mapToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUser().getId());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setStatus(String.valueOf(order.getStatus()));
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setTrackingCode(order.getTrackingCode());
        dto.setCreatedAt(order.getCreatedAt());

        List<OrderItemDTO> itemDTOs = order.getItems().stream()
                .map(item -> {
                    OrderItemDTO itemDTO = new OrderItemDTO();
                    itemDTO.setId(item.getId());
                    itemDTO.setOrderId(item.getOrder().getId());
                    itemDTO.setVariationId(item.getVariation().getId());
                    itemDTO.setQuantity(item.getQuantity());
                    itemDTO.setSubtotal(item.getSubtotal());
                    return itemDTO;
                })
                .collect(Collectors.toList());

        dto.setItems(itemDTOs);
        return dto;
    }
}