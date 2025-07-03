package com.mraphael.CallOfSweets.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class AuthExceptions extends RuntimeException {

    private AuthExceptions(String message) {
        super(message);
    }

    public static ResponseStatusException invalidCredentials() {
        return new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Credenciais inválidas. E-mail ou senha incorretos."
        );
    }

    public static ResponseStatusException emailAlreadyRegistered(String email) {
        return new ResponseStatusException(
                HttpStatus.CONFLICT,
                String.format("O e-mail '%s' já está cadastrado no sistema.", email)
        );
    }

    public static ResponseStatusException registrationFailed(String reason) {
        return new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                String.format("Falha no registro: %s", reason)
        );
    }

    public static ResponseStatusException invalidToken() {
        return new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Token inválido ou expirado. Por favor, faça login novamente."
        );
    }

    public static ResponseStatusException unauthorizedAccess() {
        return new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "Você não tem permissão para acessar este recurso."
        );
    }
    public static ResponseStatusException validationError(String field, String message) {
        return new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                String.format("Erro de validação no campo '%s': %s", field, message)
        );
    }
}