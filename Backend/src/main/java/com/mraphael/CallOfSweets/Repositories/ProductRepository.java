package com.mraphael.CallOfSweets.Repositories;

import com.mraphael.CallOfSweets.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
}