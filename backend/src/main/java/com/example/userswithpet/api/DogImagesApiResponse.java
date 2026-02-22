package com.example.userswithpet.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DogImagesApiResponse(
        List<String> message,
        String status
) {
}

