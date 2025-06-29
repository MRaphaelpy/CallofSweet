package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.OrderItemDTO;
import com.mraphael.CallOfSweets.Entities.OrderItem;
import java.util.List;

public interface OrderItemService {
    OrderItemDTO createOrderItem(OrderItemDTO orderItemDTO);
    OrderItemDTO getOrderItemById(Long id);
    List<OrderItemDTO> getAllOrderItems();
    OrderItemDTO updateOrderItem(Long id, OrderItemDTO orderItemDTO);
    void deleteOrderItem(Long id);
}