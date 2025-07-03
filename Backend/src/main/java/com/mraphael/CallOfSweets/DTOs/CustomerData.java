package com.mraphael.CallOfSweets.DTOs;

import com.mraphael.CallOfSweets.Entities.Address;
import lombok.Data;

@Data
public class CustomerData {
    private String name;
    private String email;
    private String cpf;
    private String phone;
    private Address address;
}
