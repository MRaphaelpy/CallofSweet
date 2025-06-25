package com.mraphael.CallOfSweets.DTOs;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class LoginResponseDTO {
    private String token;
    private Long userId;
    private String name;
    private String email;
    private String role;

    public LoginResponseDTO(String token, Long userId, String name, String email, String role) {
        this.token = token;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}