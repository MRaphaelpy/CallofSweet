package com.mraphael.CallOfSweets.Controllers;

import com.mraphael.CallOfSweets.DTOs.OrderItemDTO;
import com.mraphael.CallOfSweets.Services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order-items")
public class OrderItemController {

    private final OrderItemService orderItemService;

    @Autowired
    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @PostMapping
    public ResponseEntity<OrderItemDTO> createOrderItem(@Validated @RequestBody OrderItemDTO orderItemDTO) {
        OrderItemDTO createdItem = orderItemService.createOrderItem(orderItemDTO);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItemDTO> getOrderItemById(@PathVariable Long id) {
        OrderItemDTO orderItem = orderItemService.getOrderItemById(id);
        return ResponseEntity.ok(orderItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderItemDTO> updateOrderItem(
            @PathVariable Long id,
            @Validated @RequestBody OrderItemDTO orderItemDTO) {
        OrderItemDTO updatedItem = orderItemService.updateOrderItem(id, orderItemDTO);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable Long id) {
        orderItemService.deleteOrderItem(id);
        return ResponseEntity.noContent().build();
    }
}