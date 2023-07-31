package com.ssafy.move;

import com.ssafy.move.domain.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@SpringBootTest
@Transactional
public class test1 {
    @Autowired
    private EntityManager em;

    @Test
    public void test(){
        FormStatus formStatus = em.find(FormStatus.class, '1');
        System.out.println(formStatus.getStatusName());
    }

    @Test
    public void membertest(){
        ApplyForm applyForm = em.find(ApplyForm.class, 1);
        System.out.println(applyForm.getUId());
        System.out.println(applyForm.getPId());
    }

//    @Test
//    public void suggestionTest(){
//
//        Suggestion suggestion = em.find(Suggestion.class, 1);
//        System.out.println(suggestion);
//        System.out.println(suggestion.getSMoney());
//
//    }
//
//    @Test
//    public void reviewTest(){
//        Review review = em.find(Review.class, 1);
//        System.out.println(review.getRContent());
//
//
//
//
//    }



}
