package com.mraphael.CallOfSweets.Mappers;

import com.mraphael.CallOfSweets.DTOs.PaymentDTO;
import com.mraphael.CallOfSweets.Entities.Payment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    @Autowired
    private ModelMapper modelMapper;

    public PaymentDTO toDTO(Payment payment) {
        return modelMapper.map(payment, PaymentDTO.class);
    }

    public Payment toEntity(PaymentDTO paymentDTO) {
        return modelMapper.map(paymentDTO, Payment.class);
    }
    public void map(PaymentDTO paymentDTO, Payment payment) {
        var order = payment.getOrder();

        modelMapper.map(paymentDTO, payment);

        payment.setOrder(order);
    }
}