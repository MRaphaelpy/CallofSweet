package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.DTOs.LoginRequestDTO;
import com.mraphael.CallOfSweets.DTOs.LoginResponseDTO;
import com.mraphael.CallOfSweets.Entities.User;
import com.mraphael.CallOfSweets.Exceptions.UserExceptions;
import com.mraphael.CallOfSweets.Repositories.UserRepository;
import com.mraphael.CallOfSweets.Security.TokenService;
import com.mraphael.CallOfSweets.Services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> UserExceptions.userNotFound());

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw UserExceptions.userPassword();
        }

        String token = tokenService.generateToken(user);

        return LoginResponseDTO.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name())
                .build();
    }

    public void register(@Valid User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw UserExceptions.resgistredUser();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}