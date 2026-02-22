package com.example.userswithpet.service;

import com.example.userswithpet.api.DogImagesApiResponse;
import com.example.userswithpet.api.RandomUserApiResponse;
import com.example.userswithpet.model.Dob;
import com.example.userswithpet.model.UserWithPet;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserWithPetService {

    private static final String RANDOM_USER_BASE_URL = "https://randomuser.me/api/";
    private static final String DOG_API_URL = "https://dog.ceo/api/breeds/image/random";

    private final RestTemplate restTemplate;

    public UserWithPetService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<UserWithPet> fetchUsersWithPets(String nationality, int count) {
        RandomUserApiResponse randomUsers = fetchRandomUsers(nationality, count);
        List<String> dogImages = fetchRandomDogImages(count);

        List<UserWithPet> usersWithPets = new ArrayList<>();

        for (int i = 0; i < randomUsers.results().size(); i++) {
            RandomUserApiResponse.UserResult userResult = randomUsers.results().get(i);
            String petImage = dogImages.get(i);

            String id = userResult.id() != null ? userResult.id().value() : null;
            String country = userResult.nat();
            String name = buildName(userResult.name());
            Dob dob = userResult.dob() != null
                    ? new Dob(userResult.dob().date(), userResult.dob().age())
                    : null;

            usersWithPets.add(new UserWithPet(
                    id,
                    userResult.gender(),
                    country,
                    name,
                    userResult.email(),
                    dob,
                    userResult.phone(),
                    petImage
            ));
        }

        return usersWithPets;
    }

    private RandomUserApiResponse fetchRandomUsers(String nationality, int count) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(RANDOM_USER_BASE_URL)
                .queryParam("results", count);

        if (nationality != null && !nationality.isBlank()) {
            builder.queryParam("nat", nationality.toLowerCase());
        }

        URI uri = builder.build().toUri();

        try {
            RandomUserApiResponse response =
                    restTemplate.getForObject(uri, RandomUserApiResponse.class);
            if (response == null || response.results() == null || response.results().isEmpty()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "Random User API returned an empty response"
                );
            }
            return response;
        } catch (RestClientException ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Failed to fetch data from Random User API",
                    ex
            );
        }
    }

    private List<String> fetchRandomDogImages(int count) {
        String url = DOG_API_URL + "/" + count;
        try {
            DogImagesApiResponse response =
                    restTemplate.getForObject(url, DogImagesApiResponse.class);
            if (response == null || response.message() == null || response.message().size() < count) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "Dog API returned an invalid response"
                );
            }
            return response.message();
        } catch (RestClientException ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Failed to fetch data from Dog API",
                    ex
            );
        }
    }

    private String buildName(RandomUserApiResponse.UserResult.Name name) {
        if (name == null) {
            return "";
        }
        StringBuilder builder = new StringBuilder();
        if (name.first() != null && !name.first().isBlank()) {
            builder.append(name.first()).append(" ");
        }
        if (name.last() != null && !name.last().isBlank()) {
            builder.append(name.last());
        }
        return builder.toString().trim();
    }
}

