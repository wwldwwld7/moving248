package com.ssafy.move.repository;

import com.ssafy.move.domain.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class ReviewRepository {

    private final EntityManager em;

    public void writeReview(Review review) {
        em.persist(review);
    }
}
