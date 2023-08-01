package com.ssafy.move.repository;

import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.domain.Members;
import com.ssafy.move.dto.request.ApplyFormRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@RequiredArgsConstructor
public class ApplyFormRepository {

    @PersistenceContext
    private final EntityManager em;

    public void save(ApplyForm applyForm){
        em.persist(applyForm);
    }

    public Members findMemberById(int id){
        Members member = em.find(Members.class, id);

        System.out.println(member);
        return member;
    }



}
