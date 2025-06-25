package com.mraphael.CallOfSweets.Repositories;

import com.mraphael.CallOfSweets.Entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
}