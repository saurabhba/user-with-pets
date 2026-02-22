package com.example.userswithpet.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DogImageApiResponse(
        String message,
        String status
) {
}

