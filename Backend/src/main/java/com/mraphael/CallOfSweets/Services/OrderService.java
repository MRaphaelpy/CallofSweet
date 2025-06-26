package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.OrderDTO;
import com.mraphael.CallOfSweets.Entities.Order;
import java.util.List;

public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO);
    OrderDTO getOrderById(Long id);
    List<OrderDTO> getAllOrders();
    OrderDTO updateOrder(Long id, OrderDTO orderDTO);
    void deleteOrder(Long id);
    List<OrderDTO> getOrdersByUserId(Long userId);
}