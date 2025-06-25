package com.mraphael.CallOfSweets.Repositories;

import com.mraphael.CallOfSweets.Entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
}
