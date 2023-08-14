package com.ssafy.move.repository;

import com.ssafy.move.domain.*;
import com.ssafy.move.dto.response.DetailApplyFormResponseDto;
import com.ssafy.move.dto.response.SidoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Tuple;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class ApplyFormRepository {


    private final EntityManager em;



    // 신청서 상태 관련 전체조회
    public List<ApplyForm> findAllApplyForm(){

        String jpql = "select a from ApplyForm a";

        List<ApplyForm> resultList = em.createQuery(jpql, ApplyForm.class).getResultList();

        return resultList;
    }


    // 신청서 유무
    public List<ApplyForm> existForm(int uId){

        String jpql = "select a from ApplyForm a where a.uId.id = :uId " +
                "and a.uId.memberType= 'u' and a.fStatus !=3 order by a.fModifyTime desc ";

        List<ApplyForm> resultList = em.createQuery(jpql, ApplyForm.class)
                .setParameter("uId", uId)
                .getResultList();


        return resultList;
    }

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
    
    // 신청서 수정
    public void updateApplyForm(ApplyForm applyForm){
        // 수정
        em.merge(applyForm);
    }

    // 신청서 상태 이사완료로 수정
    public void updateFormStatus(int fId){

        ApplyForm applyForm = em.find(ApplyForm.class, fId);
        applyForm.setFStatus('3');
        em.merge(applyForm);
    }

    // 신청서 삭제
    public void deleteApplyForm(int id){
        // 삭제
        em.remove(findApplyFormById(id));
    }

    // 확정된 업체 id로 신청서 가져오기
    public List<ApplyForm> findApplyByPId(int pId){

        String jpql = "select a from ApplyForm a where a.pId.id = :pId ";

        List<ApplyForm> resultList = em.createQuery(jpql, ApplyForm.class)
                .setParameter("pId", pId)
                .getResultList();

        return resultList;
    }

    
    // 신청서 전체 조회
    public List<Tuple> findAll(){


        String jpql = "SELECT a, c, s.sidoName, g.guName, s2.sidoName, g2.guName " +
                "FROM ApplyForm a " +
                "JOIN MoveCategory c ON a.fCategory = c.categoryCode " +
                "JOIN Sido s ON a.fDepSido = s.sidoCode " +
                "JOIN Gu g ON a.fDepSido = g.sido.sidoCode AND a.fDepGungu = g.guCode " +
                "JOIN Sido s2 ON a.fArrSido = s2.sidoCode " +
                "JOIN Gu g2 ON a.fArrSido = g2.sido.sidoCode AND a.fArrGungu = g2.guCode " +
                "order by a.fModifyTime desc";

        List<Tuple> resultList = em.createQuery(jpql, Tuple.class).getResultList();


        return resultList;
    }

    // 주소별 카테고리별 조회
    public List<Tuple> findByOption(String sido, String gungu, int category, int pId) {
        String jpql = "SELECT a, c, s.sidoName, g.guName, s2.sidoName, g2.guName " +
                "FROM ApplyForm a " +
                "JOIN MoveCategory c ON a.fCategory = c.categoryCode " +
                "JOIN Sido s ON a.fDepSido = s.sidoCode " +
                "JOIN Gu g ON a.fDepSido = g.sido.sidoCode AND a.fDepGungu = g.guCode " +
                "JOIN Sido s2 ON a.fArrSido = s2.sidoCode " +
                "JOIN Gu g2 ON a.fArrSido = g2.sido.sidoCode AND a.fArrGungu = g2.guCode ";

        Map<String, Object> parameters = new HashMap<>();

        // 전체
        // 참여, 미참여, 확정
//        if (category == 2 || category == 3 || category == 4) {
//            jpql += " Where a.pId.id ";
//            // 참여
//            if (category == 2) {
//                jpql += "= :pId ";
//            parameters.put("pId", pId);
//            // 미참여
//            } else if (category == 3) {
//                jpql += "= null And a.fStatus = 1 ";
//            // 확정
//            } else if (category == 4) {
//                jpql += "= :pId AND a.fStatus != 1 ";
//            parameters.put("pId", pId);
//            }
//        }


        if (!sido.equals("0")) {
            jpql += " And  a.fDepSido = :sido or a.fArrSido = :sido ";
            parameters.put("sido", sido);
        }

        // 군구에서 전국
        if (!gungu.equals("0")) {
            jpql += " AND a.fDepGungu = :gungu or a.fArrGungu = :gungu ";
            parameters.put("gungu", gungu);
        }

        jpql += "ORDER BY a.fModifyTime DESC";

        TypedQuery<Tuple> query = em.createQuery(jpql, Tuple.class);

        for (Map.Entry<String, Object> parameter : parameters.entrySet()) {
            query.setParameter(parameter.getKey(), parameter.getValue());
        }

        return query.getResultList();
    }


    // 신청서 상세 조회
    public List<Tuple> findDetailApplyById(int fId){



        String jpql = "select a,c, s, g, s2, g2 from ApplyForm a " +
                "JOIN MoveCategory c ON a.fCategory = c.categoryCode " +
                "JOIN Sido s ON a.fDepSido = s.sidoCode " +
                "JOIN Gu g ON a.fDepSido = g.sido.sidoCode AND a.fDepGungu = g.guCode " +
                "JOIN Sido s2 ON a.fArrSido = s2.sidoCode " +
                "JOIN Gu g2 ON a.fArrSido = g2.sido.sidoCode AND a.fArrGungu = g2.guCode " +
                "where a.id = :fId ";

        List<Tuple> resultList = em.createQuery(jpql, Tuple.class)
                .setParameter("fId", fId)
                .getResultList();
        System.out.println(resultList.size());
        return resultList;
    }



    // 시도 가져오기
    public List<Sido> getSido(){

        String jpql = "select s from Sido s";

        List<Sido> resultList = em.createQuery(jpql, Sido.class).getResultList();

        return resultList;

    }

    // 군구 가져오기
    public List<Gu> getGu(String sido){


        String jpql = "select g from Gu g where g.sido.sidoCode = :sido";

        List<Gu> resultList = em.createQuery(jpql, Gu.class).setParameter("sido", sido).getResultList();

        return resultList;
    }


}
