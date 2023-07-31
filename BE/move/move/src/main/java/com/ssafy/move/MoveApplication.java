package com.ssafy.move;

import com.ssafy.move.domain.FormStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.persistence.EntityManager;

@SpringBootApplication
public class MoveApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(MoveApplication.class, args);
	}

}
