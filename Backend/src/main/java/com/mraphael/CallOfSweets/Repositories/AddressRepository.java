package com.mraphael.CallOfSweets.Repositories;

import com.mraphael.CallOfSweets.Entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}
