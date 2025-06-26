package com.mraphael.CallOfSweets.Repositories;

import com.mraphael.CallOfSweets.Entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    boolean existsByOrderId(Long orderId);
}