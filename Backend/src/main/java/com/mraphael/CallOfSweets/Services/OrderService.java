package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.OrderDTO;
import com.mraphael.CallOfSweets.Entities.Order;
import java.util.List;

public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO);
    OrderDTO getOrderById(int id);
    List<OrderDTO> getAllOrders();
    OrderDTO updateOrder(int id, OrderDTO orderDTO);
    void deleteOrder(int id);
}