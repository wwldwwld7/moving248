package com.ssafy.move.service;

import com.ssafy.move.domain.Members;
import com.ssafy.move.domain.Review;
import com.ssafy.move.dto.request.ReviewRequestDto;
import com.ssafy.move.repository.ReviewRepository;
import com.ssafy.move.repository.hb.HMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final HMemberRepository memberRepository;


    @Transactional
    public void writeReview(ReviewRequestDto reviewRequestDto) {
        Review review = new Review();
        Members pMember = memberRepository.findMember(reviewRequestDto.getP_id());
        Members uMember = memberRepository.findMember(reviewRequestDto.getU_id());
        review.setUId(uMember);
        review.setPId(pMember);
        review.setRRate(reviewRequestDto.getR_rate());
        review.setRContent(reviewRequestDto.getR_content());
        reviewRepository.writeReview(review);
        pMember.setPTotalScore(pMember.getPTotalScore()+reviewRequestDto.getR_rate());
        pMember.setPReviewCnt(pMember.getPReviewCnt()+1);

    }
}
