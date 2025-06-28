package com.mraphael.CallOfSweets.Exceptions;

public class UserExceptions extends RuntimeException {

    public UserExceptions(String message) {
        super(message);
    }

    public static UserExceptions userNotFoundById(Long id) {
        return new UserExceptions("Usuário não encontrado com ID: " + id);
    }
    public static UserExceptions userNotFound() {
        return new UserExceptions("Usuário não encontrado");
    }

    public static UserExceptions emailIsNullOrEmpty() {
        return new UserExceptions("O e-mail não pode ser nulo ou vazio.");
    }

    public static UserExceptions userDtoIsNull() {
        return new UserExceptions("O objeto UserDTO não pode ser nulo.");
    }

    public static UserExceptions profileDtoIsNull() {
        return new UserExceptions("O objeto ProfileDTO não pode ser nulo.");
    }
    public static UserExceptions emptyUsers(){
        return  new UserExceptions("Sem usuários cadastrados");
    }
    public static UserExceptions resgistredUser(){
        return  new UserExceptions("Usuário Cadastrado");
    }
    public static UserExceptions userPassword(){
        return  new UserExceptions("Usuario ou senha Invalido");
    }
}
