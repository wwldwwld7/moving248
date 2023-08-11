package com.ssafy.move.service.hb;

import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.domain.Members;
import com.ssafy.move.domain.Review;
import com.ssafy.move.domain.Suggestion;
import com.ssafy.move.dto.response.*;
import com.ssafy.move.repository.hb.HMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class HMemberService {

    private final HMemberRepository memberRepository;


    @Transactional
    public UserViewDto findUserById(int m_id) {
        Members member = memberRepository.findMember(m_id);
        UserViewDto udto = new UserViewDto();
        udto.setName(member.getName());
        udto.setPhone(member.getPhone());
        udto.setEmail(member.getEmail());
        udto.setPassword(member.getPassword());
        udto.setProfile_url(member.getProfileUrl());
        List<ApplyForm> applyFormList = memberRepository.findCompForm(m_id);
        List<ReviewDto> list = new ArrayList<>();
        for(ApplyForm af:applyFormList){
            Review review = memberRepository.findReview(m_id,af.getPId().getId());
            Suggestion suggestion = memberRepository.findSuggestion(af.getId(),af.getPId().getId());
            ReviewDto rdto = new ReviewDto();
            rdto.setF_date(af.getFDate());
            rdto.setName(af.getPId().getName());
            rdto.setP_id(af.getPId().getId());
            if(review!=null){
                rdto.setR_id(review.getId());
                rdto.setR_content(review.getRContent());
                rdto.setR_rate(review.getRRate());
            }
            if(suggestion!=null){
                rdto.setS_money(suggestion.getSMoney());
            }
            list.add(rdto);
        }
        udto.setList(list);

        return udto;
    }

    @Transactional
    public List<PartnerViewDto> findAllPartner() {
        List<Members> plist = memberRepository.findAllPartner();
        List<PartnerViewDto> pvlist = new ArrayList<>();

        for(Members p : plist){
            PartnerViewDto partnerViewDto = new PartnerViewDto();
            partnerViewDto.setP_id(p.getId());
            partnerViewDto.setName(p.getName());
            partnerViewDto.setP_exp(p.getPExp());
            partnerViewDto.setP_emp_cnt(p.getPEmpCnt());
            partnerViewDto.setP_starttime(p.getPStartTime());
            partnerViewDto.setP_endtime(p.getPEndTime());
            partnerViewDto.setP_desc(p.getPDesc());
            partnerViewDto.setP_location(p.getPLocation());
            partnerViewDto.setProfile_url(p.getProfileUrl());
            partnerViewDto.setP_move_cnt(p.getPMoveCnt());
            partnerViewDto.setP_total_score(p.getPTotalScore());
            partnerViewDto.setP_review_cnt(p.getPReviewCnt());
            pvlist.add(partnerViewDto);
        }

        return pvlist;

    }

    @Transactional
    public PartnerDetailDto findPartnerById(int m_id) {
        Members pm = memberRepository.findMember(m_id);
        List<Review> rlist = memberRepository.findReviewByPid(m_id);
        PartnerDetailDto pddto = new PartnerDetailDto();
        pddto.setP_id(pm.getId());
        pddto.setP_ceo(pm.getPCeo());
        pddto.setName(pm.getName());
        pddto.setP_exp(pm.getPExp());
        pddto.setP_emp_cnt(pm.getPEmpCnt());
        pddto.setP_starttime(pm.getPStartTime());
        pddto.setP_endtime(pm.getPEndTime());
        pddto.setP_desc(pm.getPDesc());
        pddto.setP_location(pm.getPLocation());
        pddto.setProfile_url(pm.getProfileUrl());
        pddto.setP_move_cnt(pm.getPMoveCnt());
        pddto.setP_total_score(pm.getPTotalScore());
        pddto.setP_review_cnt(pm.getPReviewCnt());
        List<PReviewDto> prlist = new ArrayList<>();
        for(Review r : rlist){
            PReviewDto pr = new PReviewDto();
            pr.setR_id(r.getId());
            pr.setName(r.getUId().getName());
            pr.setR_rate(r.getRRate());
            pr.setR_content(r.getRContent());
            pr.setR_create_time(r.getRCreateTime());
            prlist.add(pr);
        }
        pddto.setList(prlist);

        return pddto;
    }
}
