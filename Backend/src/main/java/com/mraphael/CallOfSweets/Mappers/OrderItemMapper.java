package com.mraphael.CallOfSweets.Mappers;

import com.mraphael.CallOfSweets.DTOs.OrderItemDTO;
import com.mraphael.CallOfSweets.Entities.OrderItem;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class OrderItemMapper {
    @Autowired
    private ModelMapper modelMapper;

    public OrderItemDTO toDTO(OrderItem orderItem) {
        OrderItemDTO dto = modelMapper.map(orderItem, OrderItemDTO.class);

        if (orderItem.getVariation() != null) {
            if (orderItem.getVariation().getProduct() != null) {
                dto.setProductName(orderItem.getVariation().getProduct().getName());
            }

            String details = "";
            if (orderItem.getVariation().getColor() != null) {
                details += "Cor: " + orderItem.getVariation().getColor();
            }
            if (orderItem.getVariation().getSize() != null) {
                details += (details.isEmpty() ? "" : ", ") + "Tamanho: " + orderItem.getVariation().getSize();
            }
            dto.setVariationDetails(details);
        }

        return dto;
    }

    public OrderItem toEntity(OrderItemDTO orderItemDTO) {
        OrderItem entity = modelMapper.map(orderItemDTO, OrderItem.class);

        if (orderItemDTO.getSubtotal() != null) {
            entity.setSubtotal(BigDecimal.valueOf(orderItemDTO.getSubtotal().doubleValue()));
        }

        return entity;
    }

    public void map(OrderItemDTO orderItemDTO, OrderItem orderItem) {

        var variation = orderItem.getVariation();
        var order = orderItem.getOrder();

        modelMapper.map(orderItemDTO, orderItem);


        orderItem.setVariation(variation);
        orderItem.setOrder(order);

        if (orderItemDTO.getSubtotal() != null) {
            orderItem.setSubtotal(BigDecimal.valueOf(orderItemDTO.getSubtotal().doubleValue()));
        }
    }
}