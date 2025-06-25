package com.mraphael.CallOfSweets.DTOs;
import com.mraphael.CallOfSweets.Entities.Address;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private List<AddressDTO> addresses;
    private String phone;
    private Date birthday;
    private String role;
    private Date createdAt;
}