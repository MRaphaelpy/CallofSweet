package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.DTOs.OrderItemDTO;
import com.mraphael.CallOfSweets.Entities.OrderItem;
import com.mraphael.CallOfSweets.Exceptions.OrderItemNotFoundException;
import com.mraphael.CallOfSweets.Mappers.OrderItemMapper;
import com.mraphael.CallOfSweets.Repositories.OrderItemRepository;
import com.mraphael.CallOfSweets.Services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderItemMapper orderItemMapper;

    @Override
    public OrderItemDTO createOrderItem(OrderItemDTO orderItemDTO) {
        OrderItem orderItem = orderItemMapper.toEntity(orderItemDTO);
        OrderItem savedOrderItem = orderItemRepository.save(orderItem);
        return orderItemMapper.toDTO(savedOrderItem);
    }

    @Override
    public OrderItemDTO getOrderItemById(int id) {
        OrderItem orderItem = orderItemRepository.findById(id)
                .orElseThrow(() -> new OrderItemNotFoundException("Order item not found with ID: " + id));
        return orderItemMapper.toDTO(orderItem);
    }

    @Override
    public List<OrderItemDTO> getAllOrderItems() {
        return orderItemRepository.findAll().stream()
                .map(orderItemMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteOrderItem(int id) {
        if (!orderItemRepository.existsById(id)) {
            throw new OrderItemNotFoundException("Order item not found with ID: " + id);
        }
        orderItemRepository.deleteById(id);
    }

    @Override
    public OrderItemDTO updateOrderItem(int id, OrderItemDTO orderItemDTO) {
        OrderItem existingOrderItem = orderItemRepository.findById(id)
                .orElseThrow(() -> new OrderItemNotFoundException("Order item not found with ID: " + id));
        orderItemMapper.map(orderItemDTO, existingOrderItem);
        OrderItem updatedOrderItem = orderItemRepository.save(existingOrderItem);
        return orderItemMapper.toDTO(updatedOrderItem);
    }
}