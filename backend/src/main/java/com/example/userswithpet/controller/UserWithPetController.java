package com.example.userswithpet.controller;

import com.example.userswithpet.model.UserWithPet;
import com.example.userswithpet.service.UserWithPetService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Validated
@CrossOrigin(origins = "http://localhost:5174")
public class UserWithPetController {

    private final UserWithPetService userWithPetService;

    public UserWithPetController(UserWithPetService userWithPetService) {
        this.userWithPetService = userWithPetService;
    }

    @GetMapping("/users-with-pet")
    public java.util.List<UserWithPet> getUsersWithPet(
            @RequestParam(name = "nat", required = false) String nationality,
            @RequestParam(name = "count", defaultValue = "5")
            @Min(1) @Max(50) int count
    ) {
        return userWithPetService.fetchUsersWithPets(nationality, count);
    }
}

