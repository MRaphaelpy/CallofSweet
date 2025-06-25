package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.DTOs.PaymentDTO;
import com.mraphael.CallOfSweets.Entities.Payment;
import com.mraphael.CallOfSweets.Exceptions.PaymentNotFoundException;
import com.mraphael.CallOfSweets.Mappers.PaymentMapper;
import com.mraphael.CallOfSweets.Repositories.PaymentRepository;
import com.mraphael.CallOfSweets.Services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentMapper paymentMapper;

    @Override
    public PaymentDTO createPayment(PaymentDTO paymentDTO) {
        Payment payment = paymentMapper.toEntity(paymentDTO);
        Payment savedPayment = paymentRepository.save(payment);
        return paymentMapper.toDTO(savedPayment);
    }

    @Override
    public PaymentDTO getPaymentById(int id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with ID: " + id));
        return paymentMapper.toDTO(payment);
    }

    @Override
    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(paymentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentDTO updatePayment(int id, PaymentDTO paymentDTO) {
        Payment existingPayment = paymentRepository.findById(id)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with ID: " + id));
        paymentMapper.map(paymentDTO, existingPayment);
        Payment updatedPayment = paymentRepository.save(existingPayment);
        return paymentMapper.toDTO(updatedPayment);
    }

    @Override
    public void deletePayment(int id) {
        if (!paymentRepository.existsById(id)) {
            throw new PaymentNotFoundException("Payment not found with ID: " + id);
        }
        paymentRepository.deleteById(id);
    }
}