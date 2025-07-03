package com.mraphael.CallOfSweets.Impl;

import com.mraphael.CallOfSweets.DTOs.LoginRequestDTO;
import com.mraphael.CallOfSweets.DTOs.LoginResponseDTO;
import com.mraphael.CallOfSweets.DTOs.RegisterRequestDTO;
import com.mraphael.CallOfSweets.Entities.User;
import com.mraphael.CallOfSweets.Exceptions.AuthExceptions;
import com.mraphael.CallOfSweets.Mappers.AuthMapper;
import com.mraphael.CallOfSweets.Repositories.UserRepository;
import com.mraphael.CallOfSweets.Security.TokenService;
import com.mraphael.CallOfSweets.Services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final AuthMapper authMapper;

    @Override
    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(AuthExceptions::invalidCredentials);

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw AuthExceptions.invalidCredentials();
        }

        String token = tokenService.generateToken(user);
        return authMapper.toLoginResponse(user, token);
    }

    @Override
    public void register(@Valid RegisterRequestDTO registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw AuthExceptions.emailAlreadyRegistered(registerRequest.getEmail());
        }
        try {
            User user = authMapper.toUser(registerRequest);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        } catch (Exception e) {
            throw AuthExceptions.registrationFailed(e.getMessage());
        }
    }
}