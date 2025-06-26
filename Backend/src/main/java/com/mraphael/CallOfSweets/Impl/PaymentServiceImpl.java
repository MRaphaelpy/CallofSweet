package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.DTOs.PaymentDTO;
import com.mraphael.CallOfSweets.Entities.Order;
import com.mraphael.CallOfSweets.Entities.Payment;
import com.mraphael.CallOfSweets.Entities.PaymentStatus;
import com.mraphael.CallOfSweets.Exceptions.PaymentNotFoundException;
import com.mraphael.CallOfSweets.Mappers.PaymentMapper;
import com.mraphael.CallOfSweets.Repositories.OrderRepository;
import com.mraphael.CallOfSweets.Repositories.PaymentRepository;
import com.mraphael.CallOfSweets.Services.PaymentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional
    public PaymentDTO createPayment(PaymentDTO paymentDTO) {
        Order order = orderRepository.findById(Math.toIntExact(paymentDTO.getOrderId()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Order not found with id: " + paymentDTO.getOrderId()));

        if (paymentRepository.existsByOrderId(order.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Payment already exists for this order");
        }

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setPaymentMethod(paymentDTO.getPaymentMethod());
        payment.setTransactionId(paymentDTO.getTransactionId());
        payment.setAmount(paymentDTO.getAmount());
        payment.setStatus(PaymentStatus.valueOf(paymentDTO.getStatus()));

        Payment savedPayment = paymentRepository.save(payment);

        order.setPayment(savedPayment);
        orderRepository.save(order);

        return mapToDTO(savedPayment);
    }

    @Override
    public PaymentDTO getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Payment not found with id: " + id));
        return mapToDTO(payment);
    }

    @Override
    public List<PaymentDTO> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return payments.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PaymentDTO updatePayment(Long id, PaymentDTO paymentDTO) {
        Payment payment = paymentRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Payment not found with id: " + id));

        payment.setPaymentMethod(paymentDTO.getPaymentMethod());
        payment.setTransactionId(paymentDTO.getTransactionId());
        payment.setAmount(paymentDTO.getAmount());
        payment.setStatus(PaymentStatus.valueOf(paymentDTO.getStatus()));

        Payment updatedPayment = paymentRepository.save(payment);
        return mapToDTO(updatedPayment);
    }

    @Override
    @Transactional
    public void deletePayment(Long id) {
        Payment payment = paymentRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Payment not found with id: " + id));

        Order order = payment.getOrder();
        order.setPayment(null);
        orderRepository.save(order);

        paymentRepository.delete(payment);
    }

    private PaymentDTO mapToDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setId(payment.getId());
        dto.setOrderId(payment.getOrder().getId());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setTransactionId(payment.getTransactionId());
        dto.setAmount(payment.getAmount());
        dto.setStatus(String.valueOf(payment.getStatus()));
        return dto;
    }
}