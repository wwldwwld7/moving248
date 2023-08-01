package com.ssafy.move.repository;

import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.domain.Members;
import com.ssafy.move.dto.request.ApplyFormRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ApplyFormRepository {

    @PersistenceContext
    private final EntityManager em;

    // 신청서 작성
    public void save(ApplyForm applyForm){
        //
        em.persist(applyForm);
    }

    // member 찾기
    public Members findMemberById(int id){
        Members member = em.find(Members.class, id);

        return member;
    }

    // 신청서 조회
    public ApplyForm findApplyFormById(int id){
        ApplyForm applyForm = em.find(ApplyForm.class, id);

        return applyForm;
    }

    public void updateApplyForm(ApplyForm applyForm){
        em.merge(applyForm);
    }

    public void deleteApplyForm(int id){
        // 삭제
        em.remove(findApplyFormById(id));
    }




}
