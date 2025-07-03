package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.Entities.User;
import com.mraphael.CallOfSweets.Exceptions.UserExceptions;
import com.mraphael.CallOfSweets.Repositories.UserRepository;
import com.mraphael.CallOfSweets.Services.UserService;
import com.mraphael.CallOfSweets.DTOs.UserDTO;
import com.mraphael.CallOfSweets.Mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        if (userDTO == null) {
            throw UserExceptions.userDtoIsNull();
        }
        User user = userMapper.toEntity(userDTO);
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    @Override
    public Optional<UserDTO> findByEmail(String email) {
        if (email == null || email.isEmpty()) {
            throw UserExceptions.emailIsNullOrEmpty();
        }
        return userRepository.findByEmail(email)
                .map(userMapper::toDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> UserExceptions.userNotFoundById(id));
        return userMapper.toDTO(user);
    }

    @Transactional
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        if (userDTO == null) {
            throw UserExceptions.userDtoIsNull();
        }
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> UserExceptions.userNotFoundById(id));
        userMapper.map(userDTO, existingUser);
        User updatedUser = userRepository.save(existingUser);
        return userMapper.toDTO(updatedUser);
    }

    @Transactional
    public UserDTO updateUserProfile(Long id, UserDTO profileDTO) {
        if (profileDTO == null) {
            throw UserExceptions.profileDtoIsNull();
        }
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> UserExceptions.userNotFoundById(id));

        existingUser.setName(profileDTO.getName());
        existingUser.setEmail(profileDTO.getEmail());
        existingUser.setPhone(profileDTO.getPhone());
        existingUser.setBirthday(profileDTO.getBirthday());

        User updatedUser = userRepository.save(existingUser);
        return userMapper.toDTO(updatedUser);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw UserExceptions.userNotFoundById(id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }
}