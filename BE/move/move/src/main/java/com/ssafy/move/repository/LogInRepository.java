package com.ssafy.move.repository;

import com.ssafy.move.domain.Members;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LogInRepository extends JpaRepository<Members, Integer> {

    Optional<Members> findByEmail(String email);

}