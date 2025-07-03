package com.mraphael.CallOfSweets.Exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String pedido, String id, Long orderId) {
        super(String.format("%s with %s '%d' not found", pedido, id, orderId));
    }
}