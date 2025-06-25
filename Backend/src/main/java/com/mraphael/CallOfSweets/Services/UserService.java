package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.UserDTO;
import com.mraphael.CallOfSweets.Entities.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserById(Long id);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long id, UserDTO userDTO);
    UserDTO updateUserProfile(Long userId, UserDTO profileDTO);
    void deleteUser(Long id);
    public Optional<UserDTO> findByEmail(String email);
}