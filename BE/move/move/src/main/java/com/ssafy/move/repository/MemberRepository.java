package com.ssafy.move.repository;

import com.ssafy.move.domain.Members;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Members, Integer> {
    boolean existsByEmail(String email);

    Optional<Members> findByEmail(String email);

    public void deleteById(int id);
}

