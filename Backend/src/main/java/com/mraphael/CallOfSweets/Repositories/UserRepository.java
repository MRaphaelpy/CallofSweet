package com.mraphael.CallOfSweets.Repositories;

import com.mraphael.CallOfSweets.Entities.User;
import com.mraphael.CallOfSweets.Mappers.UserMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
