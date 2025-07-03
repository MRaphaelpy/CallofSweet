package com.mraphael.CallOfSweets.Repositories;

import com.mraphael.CallOfSweets.Entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    boolean existsByOrderId(Long orderId);
    List<Payment> findAllByOrderId(Long orderId);

}