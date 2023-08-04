package com.ssafy.move.repository.hb;

import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.domain.Members;
import com.ssafy.move.domain.Review;
import com.ssafy.move.domain.Suggestion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class HMemberRepository {

    private final EntityManager em;

    public Members findMember(int m_id) {
        return em.find(Members.class, m_id);
    }


    public List<ApplyForm> findCompForm(int m_id) {
        List<ApplyForm> aflist = em.createQuery("select af from ApplyForm af where af.uId.id=:m_id and af.fStatus='3'" +
                        " order by af.fCreateTime", ApplyForm.class)
                .setParameter("m_id", m_id)
                .getResultList();
        return aflist;
    }

    public Review findReview(int m_id, int p_id) {
        List<Review> reviewList = em.createQuery("select r from Review r where r.uId.id=:m_id and r.pId.id=:p_id", Review.class)
                .setParameter("m_id", m_id)
                .setParameter("p_id", p_id)
                .getResultList();
        Review review =null;
        if(!reviewList.isEmpty()){
            review = reviewList.get(0);
        }
        return review;

    }

    public Suggestion findSuggestion(int f_id, int p_id) {
        List<Suggestion> suggestionList = em.createQuery("select s from Suggestion s where s.fId.id=:f_id and s.pId.id=:p_id", Suggestion.class)
                .setParameter("f_id", f_id)
                .setParameter("p_id", p_id)
                .getResultList();

        Suggestion suggestion =null;
        if(!suggestionList.isEmpty()){
            suggestion = suggestionList.get(0);
        }
        return suggestion;

    }

    public List<Members> findAllPartner() {
        List<Members> pList = em.createQuery("select m from Members m where m.memberType='p'", Members.class)
                .getResultList();
        return pList;

    }

    public List<Review> findReviewByPid(int p_id) {
        List<Review> prlist = em.createQuery("select r from Review r where r.pId.id=:p_id", Review.class)
                .setParameter("p_id", p_id)
                .getResultList();
        return prlist;
    }
}
