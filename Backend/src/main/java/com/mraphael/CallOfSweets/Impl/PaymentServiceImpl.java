package com.mraphael.CallOfSweets.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mraphael.CallOfSweets.DTOs.PaymentDTO;
import com.mraphael.CallOfSweets.DTOs.PaymentRequest;
import com.mraphael.CallOfSweets.DTOs.PaymentResponse;
import com.mraphael.CallOfSweets.Entities.Order;
import com.mraphael.CallOfSweets.Entities.OrderStatus;
import com.mraphael.CallOfSweets.Entities.Payment;
import com.mraphael.CallOfSweets.Entities.PaymentStatus;
import com.mraphael.CallOfSweets.Exceptions.PaymentNotFoundException;
import com.mraphael.CallOfSweets.Exceptions.PaymentProcessingException;
import com.mraphael.CallOfSweets.Exceptions.ResourceNotFoundException;
import com.mraphael.CallOfSweets.Repositories.OrderRepository;
import com.mraphael.CallOfSweets.Repositories.PaymentRepository;
import com.mraphael.CallOfSweets.Services.MercadoPagoService;
import com.mraphael.CallOfSweets.Services.PaymentService;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {
    private static final Logger log = LoggerFactory.getLogger(PaymentServiceImpl.class);

    @Autowired
    private MercadoPagoServiceImpl mercadoPagoService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional
    public PaymentDTO createPayment(PaymentDTO paymentDTO) {
        Order order = orderRepository.findById(paymentDTO.getOrderId())
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
        Payment payment = paymentRepository.findById(id)
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
        Payment payment = paymentRepository.findById(id)
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
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Payment not found with id: " + id));

        Order order = payment.getOrder();
        order.setPayment(null);
        orderRepository.save(order);

        paymentRepository.delete(payment);
    }

    @Override
    public List<PaymentDTO> getPaymentsByOrderId(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Order not found with id: " + orderId));

        List<Payment> payments = paymentRepository.findAllByOrderId(order.getId());
        return payments.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
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

    @Override
    @Transactional
    public PaymentResponse processPayment(PaymentRequest paymentRequest) {
        try {
            if (paymentRequest.getOrderId() == null) {
                throw new IllegalArgumentException("Order ID is required for payment processing");
            }

            PaymentResponse mpResponse = mercadoPagoService.processPayment(paymentRequest);
            Order order = orderRepository.findById(paymentRequest.getOrderId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Order", "id", paymentRequest.getOrderId()));

            PaymentStatus paymentStatus = convertToPaymentStatus(mpResponse.getStatus());
            Payment payment = new Payment(
                    order,
                    paymentRequest.getPaymentMethod(),
                    String.valueOf(mpResponse.getPaymentId()),
                    paymentRequest.getMercadoPago().getTransactionAmount(),
                    paymentStatus
            );

            if (paymentStatus == PaymentStatus.APPROVED) {
                order.setStatus(OrderStatus.COMPLETED);
                orderRepository.save(order);
            }

            payment = paymentRepository.save(payment);
            mpResponse.setInternalPaymentId(payment.getId());
            return mpResponse;

        } catch (MPApiException e) {
            log.error("Error in Mercado Pago API: {}", e.getApiResponse().getContent());
            throw new PaymentProcessingException("Error processing payment: " +
                    e.getApiResponse().getContent(), e);
        } catch (MPException e) {
            log.error("Error in Mercado Pago SDK: {}", e.getMessage());
            throw new PaymentProcessingException("Error in payment SDK: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("Unexpected error while processing payment: {}", e.getMessage(), e);
            throw new PaymentProcessingException("Unexpected error processing payment", e);
        }
    }

    private PaymentStatus convertToPaymentStatus(String mercadoPagoStatus) {
        switch (mercadoPagoStatus.toLowerCase()) {
            case "approved":
                return PaymentStatus.APPROVED;
            case "pending":
            case "in_process":
                return PaymentStatus.PENDING;
            case "rejected":
                return PaymentStatus.REJECTED;
            case "cancelled":
            case "refunded":
            case "charged_back":
                return PaymentStatus.CANCELLED;
            default:
                return PaymentStatus.PENDING;
        }
    }
}