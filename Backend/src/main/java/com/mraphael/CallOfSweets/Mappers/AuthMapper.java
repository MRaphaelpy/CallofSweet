package com.mraphael.CallOfSweets.Mappers;
import com.mraphael.CallOfSweets.DTOs.LoginResponseDTO;
import com.mraphael.CallOfSweets.DTOs.RegisterRequestDTO;
import com.mraphael.CallOfSweets.Entities.User;
import com.mraphael.CallOfSweets.Entities.UserRole;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {

    public User toUser(RegisterRequestDTO registerRequestDTO) {
        if (registerRequestDTO == null) {
            return null;
        }

        User user = new User();
        user.setName(registerRequestDTO.getName());
        user.setEmail(registerRequestDTO.getEmail());
        user.setPassword(registerRequestDTO.getPassword());
        user.setPhone(registerRequestDTO.getPhone());
        user.setBirthday(registerRequestDTO.getBirthday());
        user.setRole(UserRole.CUSTOMER);

        return user;
    }

    public LoginResponseDTO toLoginResponse(User user, String token) {
        if (user == null) {
            return null;
        }
        return LoginResponseDTO.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name())
                .build();
    }
}