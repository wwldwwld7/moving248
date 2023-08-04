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
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ApplyFormRepository {

    @PersistenceContext
    private final EntityManager em;

    // 신청서 유무
    public List<ApplyForm> existForm(int uId){

        String jpql = "select a from ApplyForm a where a.uId.id = :uId " +
                "and a.uId.memberType= 'u'";

        List<ApplyForm> resultList = em.createQuery(jpql, ApplyForm.class)
                .setParameter("uId", uId)
                .getResultList();

        System.out.println(resultList.toString());

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
        applyForm.setFStatus('2');
        em.merge(applyForm);
    }

    // 신청서 삭제
    public void deleteApplyForm(int id){
        // 삭제
        em.remove(findApplyFormById(id));
    }
    
    // 신청서 전체 조회
    public List<Tuple> findAll(){

        //String jpql = "select a from ApplyForm a order by a.fModifyTime DESC ";

        String jpql = "SELECT a, c from ApplyForm a, MoveCategory c " +
                "where a.fCategory = c.categoryCode " +
                "order by a.fModifyTime desc";

        List<Tuple> resultList = em.createQuery(jpql, Tuple.class).getResultList();


        return resultList;
    }

    // 주소별 카테고리별 조회
    public List<Tuple> findByOption(String sido, String gungu, int category, int pId){

        String jpql = "";


        List<Tuple> resultList = new ArrayList<>();


        // 모든 견적
        if (category==1){

            // 시도에서 전국일때
            if (sido.equals("0")){
                jpql = "select a, c from ApplyForm a, MoveCategory c " +
                        "where a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc ";

                resultList = em.createQuery(jpql, Tuple.class).getResultList();
            }
            // 시도는 값이 있고 군구에서 전체 일때
            else if(!sido.equals("0") &&  gungu.equals("0")){
                jpql = "select a, c from ApplyForm a , MoveCategory c " +
                        "where a.fDepSido = :sido " +
                        "and a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc";

                resultList = em.createQuery(jpql, Tuple.class)
                        .setParameter("sido", sido).getResultList();
            }
            // 시도와 군구 모두 값이 있을 때
            else {
                jpql = "select a, c from ApplyForm a, MoveCategory c " +
                        "where a.fDepSido = :sido " +
                        "and a.fDepGungu = :gungu " +
                        "and a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc";
                resultList = em.createQuery(jpql, Tuple.class)
                        .setParameter("sido", sido)
                        .setParameter("gungu", gungu)
                        .getResultList();
            }

            // 업체가 참여한 자기꺼
        } else if (category==2) {

            // 시도에서 전국일때
            if (sido.equals("0")){
                jpql = "select a, c from ApplyForm a, MoveCategory c " +
                        "where a.pId.id = :pId " +
                        "and a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc";

                resultList = em.createQuery(jpql, Tuple.class)
                        .setParameter("pId", pId)
                        .getResultList();
            }
            // 시도는 값이 있고 군구에서 전체 일때
            else if(!sido.equals("0") &&  gungu.equals("0")){
                jpql = "select a, c from ApplyForm a, MoveCategory c " +
                        "where a.fDepSido = :sido and a.pId.id = :pId " +
                        "and a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc";

                resultList = em.createQuery(jpql, Tuple.class)
                        .setParameter("sido", sido)
                        .setParameter("pId", pId)
                        .getResultList();
            }
            // 시도와 군구 모두 값이 있을 때
            else {
                jpql = "select a, c from ApplyForm a, MoveCategory c " +
                        "where a.fDepSido = :sido and a.fDepGungu = :gungu " +
                        "and a.pId.id = :pId " +
                        "and a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc";

                resultList = em.createQuery(jpql, Tuple.class)
                        .setParameter("sido", sido)
                        .setParameter("gungu", gungu)
                        .setParameter("pId", pId)
                        .getResultList();
            }


            // 업체가 미참여한
        } else if (category==3){


            // 시도에서 전국일때
            if (sido.equals("0")){
                jpql = "select a, c from ApplyForm a, MoveCategory c " +
                        "where a.pId.id != :pId " +
                        "and a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc";

                resultList = em.createQuery(jpql, Tuple.class)
                        .setParameter("pId", pId)
                        .getResultList();
            }
            // 시도는 값이 있고 군구에서 전체 일때
            else if(!sido.equals("0") &&  gungu.equals("0")){
                jpql = "select a, c from ApplyForm a, MoveCategory c " +
                        "where a.fDepSido = :sido and a.pId.id != :pId " +
                        "and a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc";

                resultList = em.createQuery(jpql, Tuple.class)
                        .setParameter("sido", sido)
                        .setParameter("pId", pId)
                        .getResultList();
            }
            // 시도와 군구 모두 값이 있을 때
            else {
                jpql = "select a, c from ApplyForm a, MoveCategory c " +
                        "where a.fDepSido = :sido and a.fDepGungu = :gungu " +
                        "and a.pId.id != :pId " +
                        "and a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc";

                resultList = em.createQuery(jpql, Tuple.class)
                        .setParameter("sido", sido)
                        .setParameter("gungu", gungu)
                        .setParameter("pId", pId)
                        .getResultList();
            }

        // 업체가 참여한 신청서 중 확정
        } else {

            // 시도에서 전국일때
            if (sido.equals("0")){
                jpql = "select a, c from ApplyForm a, MoveCategory c " +
                        "where a.pId.id = :pId and a.fStatus=2 " +
                        "and a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc";
                resultList = em.createQuery(jpql, Tuple.class)
                        .setParameter("pId", pId)
                        .getResultList();
            }
            // 시도는 값이 있고 군구에서 전체 일때
            else if(!sido.equals("0") &&  gungu.equals("0")){
                jpql = "select a, c from ApplyForm a, MoveCategory c " +
                        "where a.fDepSido = :sido and a.pId.id = :pId " +
                        "and a.fStatus=2 " +
                        "and a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc";
                resultList = em.createQuery(jpql, Tuple.class)
                        .setParameter("sido", sido)
                        .setParameter("pId", pId)
                        .getResultList();
            }
            // 시도와 군구 모두 값이 있을 때
            else {
                jpql = "select a, c from ApplyForm a, MoveCategory c " +
                        "where a.fDepSido = :sido and a.fDepGungu = :gungu " +
                        "and a.pId.id = :pId and a.fStatus=2 " +
                        "and a.fCategory = c.categoryCode " +
                        "order by a.fModifyTime desc";
                resultList = em.createQuery(jpql, Tuple.class)
                        .setParameter("sido", sido)
                        .setParameter("gungu", gungu)
                        .setParameter("pId", pId)
                        .getResultList();
            }

        }

        return resultList;
    }

    // 신청서 상세 조회
    public List<Tuple> findDetailApplyById(int fId){



        String jpql = "select a,c from ApplyForm a, MoveCategory c " +
                "where a.id = :fId  and  a.fCategory = c.categoryCode";

        List<Tuple> resultList = em.createQuery(jpql, Tuple.class)
                .setParameter("fId", fId)
                .getResultList();

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
