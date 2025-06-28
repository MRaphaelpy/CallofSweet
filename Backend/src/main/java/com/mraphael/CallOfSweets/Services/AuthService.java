package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.LoginRequestDTO;
import com.mraphael.CallOfSweets.DTOs.LoginResponseDTO;
import com.mraphael.CallOfSweets.Entities.User;

import javax.validation.Valid;

public interface AuthService {
    public LoginResponseDTO login(LoginRequestDTO loginRequest);
    public void register(@Valid User user);
}
