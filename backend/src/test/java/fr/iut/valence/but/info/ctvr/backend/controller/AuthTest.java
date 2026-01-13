package fr.iut.valence.but.info.ctvr.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthTest {
    @Autowired
    private MockMvc mvc;

    private final String testUsername = "test";
    private final String testPassword = "test";

    @Test
    void shouldReturnJWTToken() throws Exception {
        RequestBuilder request = post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\": \"" + this.testUsername + "\", \"password\": \"" + this.testPassword + "\"}");
        this.mvc.perform(request)
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(".")));
    }

    @Test
    void shouldThrowAnInvalidCredentialsError() throws Exception {
        RequestBuilder badPasswordRequest = post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\": \"" + this.testUsername + "\", \"password\": \"a\"}");
        this.mvc.perform(badPasswordRequest)
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(equalTo("Invalid username or password")));

        RequestBuilder badUsernameRequest = post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\": \"a\", \"password\": \"" + this.testPassword + "\"}");
        this.mvc.perform(badUsernameRequest)
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(equalTo("Invalid username or password")));
    }


    @Test
    void shouldThrowAMissingCredentialsError() throws Exception {
        RequestBuilder missingPasswordRequest = post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\": \"a\"}");
        this.mvc.perform(missingPasswordRequest)
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(equalTo("Password is required")));

        RequestBuilder missingUsernameRequest = post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"password\": \"a\"}");
        this.mvc.perform(missingUsernameRequest)
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(equalTo("Username is required")));
    }

    @Test
    void shouldThrowInvalidError() throws Exception {
        RequestBuilder missingContentRequest = post("/login").contentType(MediaType.APPLICATION_JSON);
        this.mvc.perform(missingContentRequest)
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(content().string(equalTo("Request body is missing")));

        RequestBuilder missingContentTypeRequest = post("/login").content("test");
        this.mvc.perform(missingContentTypeRequest)
                .andDo(print())
                .andExpect(status().isUnsupportedMediaType())
                .andExpect(content().string(equalTo("Content-Type 'application/octet-stream' is not supported")));

        RequestBuilder wrongContentTypeRequest = post("/login").contentType(MediaType.APPLICATION_FORM_URLENCODED);
        this.mvc.perform(wrongContentTypeRequest)
                .andDo(print())
                .andExpect(status().isUnsupportedMediaType())
                .andExpect(content().string(equalTo("Content-Type 'application/x-www-form-urlencoded;charset=UTF-8' is not supported")));
    }
}
