package fr.iut.valence.but.info.ctvr.backend.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerTypePredicate;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class PathConfig implements WebMvcConfigurer {
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix("/api", HandlerTypePredicate.forAnnotation(RestController.class));
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
//        Forward all routes that are :
//        - not defined by Controller
//        - not starting with "/api"
//        - not containing "." in last path segment
//        to index.html
        registry.addViewController("/{_:^(?!api)[^\\.]*}")
                .setViewName("forward:/");
        registry.addViewController("/{_:^(?!api).*}/**/{path:[^\\.]*}")
                .setViewName("forward:/");
    }
}