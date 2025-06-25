package com.mraphael.CallOfSweets.DTOs;

import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDTO {

    @NotEmpty(message = "Campo name é obrigatório.")
    private String name;

    private Long id;
    @NotEmpty(message = "Campo street é obrigatório.")
    private String street;

    @NotEmpty(message = "Campo city é obrigatório.")
    private String city;

    @NotEmpty(message = "Campo state é obrigatório.")
    private String state;

    @NotEmpty(message = "Campo zipCode é obrigatório.")
    private String zipCode;

    private String country;
    private boolean isDefault;
}