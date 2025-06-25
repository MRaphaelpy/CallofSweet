package com.mraphael.CallOfSweets.Mappers;

import com.mraphael.CallOfSweets.DTOs.OrderDTO;
import com.mraphael.CallOfSweets.DTOs.OrderItemDTO;
import com.mraphael.CallOfSweets.Entities.Order;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Component
public class OrderMapper {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OrderItemMapper orderItemMapper;

    @Autowired
    private PaymentMapper paymentMapper;

    public OrderDTO toDTO(Order order) {
        OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
        if (order.getItems() != null) {
            orderDTO.setItems(order.getItems().stream()
                    .map(orderItemMapper::toDTO)
                    .collect(Collectors.toList()));
        }

        if (order.getPayment() != null) {
            orderDTO.setPayment(paymentMapper.toDTO(order.getPayment()));
        }

        if (order.getUser() != null) {
            orderDTO.setUserName(order.getUser().getName());
        }

        return orderDTO;
    }

    public Order toEntity(OrderDTO orderDTO) {
        Order order = modelMapper.map(orderDTO, Order.class);

        if (orderDTO.getTotalPrice() != null) {
            order.setTotalPrice(BigDecimal.valueOf(orderDTO.getTotalPrice().doubleValue()));
        }

        return order;
    }

    public void map(OrderDTO orderDTO, Order order) {

        var items = order.getItems();
        var payment = order.getPayment();
        var user = order.getUser();

        modelMapper.map(orderDTO, order);

        order.setItems(items);
        order.setPayment(payment);
        order.setUser(user);

        if (orderDTO.getTotalPrice() != null) {
            order.setTotalPrice(BigDecimal.valueOf(orderDTO.getTotalPrice().doubleValue()));
        }
    }
}