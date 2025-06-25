package com.mraphael.CallOfSweets.Mappers;

import com.mraphael.CallOfSweets.DTOs.UserDTO;
import com.mraphael.CallOfSweets.DTOs.AddressDTO;
import com.mraphael.CallOfSweets.Entities.User;
import com.mraphael.CallOfSweets.Entities.Address;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    @Autowired
    private ModelMapper modelMapper;

    @PostConstruct
    public void configureModelMapper() {
        // Converter seguro para User -> UserDTO
        Converter<User, List<AddressDTO>> userToAddressDTOs = ctx -> {
            List<Address> addresses = ctx.getSource().getAddresses();
            if (addresses == null) return Collections.emptyList();
            return addresses.stream()
                    .map(address -> modelMapper.map(address, AddressDTO.class))
                    .collect(Collectors.toList());
        };

        modelMapper.addMappings(new PropertyMap<User, UserDTO>() {
            @Override
            protected void configure() {
                using(userToAddressDTOs).map(source, destination.getAddresses());
            }
        });

        // Converter seguro para UserDTO -> User
        Converter<UserDTO, List<Address>> userDTOToAddresses = ctx -> {
            List<AddressDTO> addressDTOs = ctx.getSource().getAddresses();
            if (addressDTOs == null) return Collections.emptyList();
            return addressDTOs.stream()
                    .map(addressDTO -> modelMapper.map(addressDTO, Address.class))
                    .collect(Collectors.toList());
        };

        modelMapper.addMappings(new PropertyMap<UserDTO, User>() {
            @Override
            protected void configure() {
                using(userDTOToAddresses).map(source, destination.getAddresses());
            }
        });
    }

    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }
        return modelMapper.map(user, UserDTO.class);
    }

    public User toEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }

        User user = modelMapper.map(userDTO, User.class);

        if (userDTO.getAddresses() != null) {
            List<Address> addresses = userDTO.getAddresses().stream()
                    .map(addressDTO -> {
                        Address address = modelMapper.map(addressDTO, Address.class);
                        address.setUser(user);
                        return address;
                    })
                    .collect(Collectors.toList());
            user.setAddresses(addresses);
        } else {
            user.setAddresses(Collections.emptyList());
        }

        return user;
    }


    public void map(UserDTO userDTO, User user) {
        if (userDTO != null && user != null) {
            modelMapper.map(userDTO, user);

            // Reatribui os endereços e seta o user em cada um
            if (userDTO.getAddresses() != null) {
                List<Address> addresses = userDTO.getAddresses().stream()
                        .map(addressDTO -> {
                            Address address = modelMapper.map(addressDTO, Address.class);
                            address.setUser(user);
                            return address;
                        })
                        .collect(Collectors.toList());
                user.setAddresses(addresses);
            } else {
                user.setAddresses(Collections.emptyList());
            }
        }
    }

}
