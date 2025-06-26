package com.mraphael.CallOfSweets.Services;

import com.mraphael.CallOfSweets.DTOs.AddressDTO;
import com.mraphael.CallOfSweets.Entities.Address;
import com.mraphael.CallOfSweets.Entities.User;
import com.mraphael.CallOfSweets.Repositories.AddressRepository;
import com.mraphael.CallOfSweets.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    public AddressDTO saveAddress(Long userId, AddressDTO addressDTO) {
        if (addressDTO.getCity() == null || addressDTO.getCity().isEmpty()) {
            throw new IllegalArgumentException("O campo city é obrigatório.");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + userId));

        Address address = new Address();
        address.setName(addressDTO.getName());
        address.setStreet(addressDTO.getStreet());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setZipCode(addressDTO.getZipCode());
        address.setDefault(addressDTO.isDefault());
        address.setCountry(addressDTO.getCountry());
        address.setUser(user);
        Address savedAddress = addressRepository.save(address);
        AddressDTO savedAddressDTO = new AddressDTO();
        savedAddressDTO.setName(savedAddress.getName());
        savedAddressDTO.setStreet(savedAddress.getStreet());
        savedAddressDTO.setCity(savedAddress.getCity());
        savedAddressDTO.setState(savedAddress.getState());
        savedAddressDTO.setZipCode(savedAddress.getZipCode());
        savedAddressDTO.setCountry(savedAddress.getCountry());
        savedAddressDTO.setDefault(savedAddress.isDefault());

        return savedAddressDTO;
    }
    public AddressDTO getAddressById(Long id) {
        Address address = addressRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado com ID: " + id));
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setStreet(address.getStreet());
        addressDTO.setCity(address.getCity());
        addressDTO.setState(address.getState());
        addressDTO.setZipCode(address.getZipCode());
        addressDTO.setCountry(address.getCountry());
        addressDTO.setDefault(address.isDefault());
        return addressDTO;
    }
    public AddressDTO updateAddress(Long id, AddressDTO addressDTO) {
        Address address = addressRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado com ID: " + id));

        if (addressDTO.getCity() == null || addressDTO.getCity().isEmpty()) {
            throw new IllegalArgumentException("O campo city é obrigatório.");
        }

        address.setStreet(addressDTO.getStreet());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setZipCode(addressDTO.getZipCode());
        address.setCountry(addressDTO.getCountry());
        address.setDefault(addressDTO.isDefault());

        Address updatedAddress = addressRepository.save(address);
        AddressDTO updatedAddressDTO = new AddressDTO();
        updatedAddressDTO.setStreet(updatedAddress.getStreet());
        updatedAddressDTO.setCity(updatedAddress.getCity());
        updatedAddressDTO.setState(updatedAddress.getState());
        updatedAddressDTO.setZipCode(updatedAddress.getZipCode());
        updatedAddressDTO.setCountry(updatedAddress.getCountry());
        updatedAddressDTO.setDefault(updatedAddress.isDefault());

        return updatedAddressDTO;
    }
    public void deleteAddress(Long id) {
        Address address = addressRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado com ID: " + id));
        addressRepository.delete(address);
    }
}