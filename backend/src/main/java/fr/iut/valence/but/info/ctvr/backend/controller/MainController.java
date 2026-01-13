package fr.iut.valence.but.info.ctvr.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    @GetMapping
    public String getHelloWorld() {
        return "Hello World";
    }
}
