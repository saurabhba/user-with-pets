package com.example.userswithpet.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record RandomUserApiResponse(
        List<UserResult> results
) {
    public record UserResult(
            Id id,
            String gender,
            Name name,
            String email,
            String nat,
            Dob dob,
            String phone,
            Picture picture
    ) {
        public record Name(
                String title,
                String first,
                String last
        ) {
        }

        public record Id(
                String name,
                String value
        ) {
        }

        public record Dob(
                String date,
                int age
        ) {
        }

        public record Picture(
                @JsonProperty("thumbnail") String thumbnailUrl,
                @JsonProperty("medium") String mediumUrl,
                @JsonProperty("large") String largeUrl
        ) {
        }
    }
}

