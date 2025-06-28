package com.mraphael.CallOfSweets.Exceptions;

public class ProductVariationException extends RuntimeException{
    public ProductVariationException(String message) {
        super(message);
    }

    public static ProductVariationException  productVariatioNotFoundById(int id){
             return new ProductVariationException("Variação  nao encontrada com o ID: "+ id);
    }

    public static ProductVariationException dontDeletProductVAriation (){
        return new ProductVariationException("Não é possivel deletar uma variação");
    }

}

