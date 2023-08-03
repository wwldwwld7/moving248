package com.ssafy.move.repository;

import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.domain.Members;
import com.ssafy.move.domain.Suggestion;
import com.ssafy.move.dto.request.SuggestionRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class SuggestionRepository {

    @PersistenceContext
    private final EntityManager em;

    // 견적서 작성
    public void writeSuggestion(Suggestion suggestion){
        em.persist(suggestion);
    }
    
    // 업체id가 들어가 있는 members 찾아오기
    public Members findByPid(int pId){

        Members partner = em.find(Members.class, pId);

        return partner;
    }

    // 신청서id에 따른 전체 견적서 조회 날짜순으로
    public List<Suggestion> findAllSuggestionByFid(int fId){

        String jpql = "select s from Suggestion s " +
                "where s.fId.id = :fId order by s.sModifyTime desc";

        List<Suggestion> suggestionList = em.createQuery(jpql, Suggestion.class)
                .setParameter("fId", fId)
                .getResultList();

        return suggestionList;

    }
    
    // 견적서 가격순을 최저가로 조회
    public List<Suggestion> suggestionSortByPrice(int fId) {

        String jpql = "select s from Suggestion s " +
                "where s.fId.id = :fId order by s.sMoney asc";

        List<Suggestion> suggestionList = em.createQuery(jpql, Suggestion.class)
                .setParameter("fId", fId)
                .getResultList();

        return suggestionList;
    }


    
    // 견적서 이사이동횟수 내림차순으로 조회
    public List<Suggestion> suggestionSortByMoveCnt(int fId) {

        String jpql = "select s from Suggestion s " +
                "where s.fId.id = :fId order by s.pId.pMoveCnt desc";

        List<Suggestion> suggestionList = em.createQuery(jpql, Suggestion.class)
                .setParameter("fId", fId)
                .getResultList();

        return suggestionList;
    }




    // 견적서 수정
    public void updateSuggestion(Suggestion suggestion){
        em.merge(suggestion);
    }

    // 신청서에 파트너가 작성한 견적서 불러오기
    public Suggestion findSuggestionByFidAndPid(int fId, int pId){
        String jpql = "select s from Suggestion s where s.fId.id = :fId " +
                "and s.pId.id = :pId";
        Suggestion suggestion = em.createQuery(jpql, Suggestion.class).setParameter("fId", fId)
                .setParameter("pId", pId).getSingleResult();

        return suggestion;
    }

    // 견적서 삭제
    public void deleteSuggestion(Suggestion suggestion){
        em.remove(suggestion);
    }







}
