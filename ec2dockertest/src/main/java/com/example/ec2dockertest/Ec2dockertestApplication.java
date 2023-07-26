package com.example.ec2dockertest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Ec2dockertestApplication {

    @GetMapping("/")
    public String hello(){
        return "Hello HJ";
    }


    public static void main(String[] args) {
        SpringApplication.run(Ec2dockertestApplication.class, args);
    }

}
