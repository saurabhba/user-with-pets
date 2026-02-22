package com.example.userswithpet.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RandomUserApiResponse(
        List<UserResult> results
) {
    @JsonIgnoreProperties(ignoreUnknown = true)
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
        @JsonIgnoreProperties(ignoreUnknown = true)
        public record Name(
                String title,
                String first,
                String last
        ) {
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public record Id(
                String name,
                String value
        ) {
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public record Dob(
                String date,
                int age
        ) {
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public record Picture(
                @JsonProperty("thumbnail") String thumbnailUrl,
                @JsonProperty("medium") String mediumUrl,
                @JsonProperty("large") String largeUrl
        ) {
        }
    }
}

