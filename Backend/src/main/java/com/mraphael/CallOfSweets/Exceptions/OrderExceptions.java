package com.mraphael.CallOfSweets.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

public class OrderExceptions extends RuntimeException {
    public OrderExceptions(String message) {
        super(message);
    }

    public static ResponseStatusException orderNotFoundById(Long id) {
        return new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                String.format("Pedido não encontrado com o ID: %d", id));
    }

    public static ResponseStatusException noValidProductVariations(List<String> invalidItems) {
        return new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                String.format("Nenhuma variação de produto válida encontrada no pedido. IDs inválidos: %s",
                        String.join(", ", invalidItems)));
    }

    public static ResponseStatusException invalidOrderStatus(String status) {
        return new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                String.format("Status de pedido inválido: %s", status));
    }

    public static ResponseStatusException orderUpdateFailed(Long id) {
        return new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                String.format("Falha ao atualizar o pedido com ID: %d", id));
    }

    public static ResponseStatusException orderItemValidationFailed(String message) {
        return new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                String.format("Erro na validação do item do pedido: %s", message));
    }
}