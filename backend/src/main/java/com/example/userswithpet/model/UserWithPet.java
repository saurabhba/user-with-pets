package com.example.userswithpet.model;

public record UserWithPet(
        String id,
        String gender,
        String country,
        String name,
        String email,
        Dob dob,
        String phone,
        String petImage
) {
}

