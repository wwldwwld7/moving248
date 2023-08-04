package com.ssafy.move.service;

import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.domain.Members;
import com.ssafy.move.domain.Suggestion;
import com.ssafy.move.dto.request.SuggestionRequestDto;
import com.ssafy.move.dto.response.DetailSuggestionResponseDto;
import com.ssafy.move.repository.ApplyFormRepository;
import com.ssafy.move.repository.SuggestionRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SuggestionService {

    private final SuggestionRepository suggestionRepository;
    private final ApplyFormRepository applyFormRepository;

    // 견적서 작성
    @Transactional
    public void writeSuggestion(int fId, SuggestionRequestDto suggestionRequestDto){

        Suggestion suggestion = new Suggestion();

        ApplyForm applyForm = applyFormRepository.findApplyFormById(fId);
        suggestion.setFId(applyForm);

        Members partner = suggestionRepository.findByPid(suggestionRequestDto.getP_id());
        suggestion.setPId(partner);

        suggestion.setSMoney(suggestionRequestDto.getS_money());
        suggestion.setSDesc(suggestionRequestDto.getS_desc());

        suggestionRepository.writeSuggestion(suggestion);

    }

    // 견적서 수정
    @Transactional
    public void updateSuggestion(int fId, SuggestionRequestDto suggestionRequestDto){

        Suggestion suggestion = suggestionRepository.findSuggestionByFidAndPid(fId, suggestionRequestDto.getP_id());

        suggestion.setSMoney(suggestionRequestDto.getS_money());
        suggestion.setSDesc(suggestionRequestDto.getS_desc());
        suggestion.setSModifyTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

        suggestionRepository.updateSuggestion(suggestion);

    }

    // 견적서 삭제
    @Transactional
    public void deleteSuggestion(int fId, int pId){

        Suggestion suggestion = suggestionRepository.findSuggestionByFidAndPid(fId, pId);
        suggestionRepository.deleteSuggestion(suggestion);
    }

    // 견적서 확정
    @Transactional
    public void confirmSuggestion(int fId, int pId){

        ApplyForm applyForm = applyFormRepository.findApplyFormById(fId);
        Members partner = suggestionRepository.findByPid(pId);

        applyForm.setPId(partner);
        applyForm.setFStatus('2');

    }

    // 견적서 취소
    @Transactional
    public void cancelSuggestion(int fId, int uId, int pId){

        ApplyForm applyForm = applyFormRepository.findApplyFormById(fId);
        Members partner = null;

        applyForm.setPId(partner);
        applyForm.setFStatus('1');

    }

    // 견적서 정렬
    @Transactional
    public List<DetailSuggestionResponseDto> sortSuggestion(int fId, int option){

        List<DetailSuggestionResponseDto> resultList = new ArrayList<>();

        List<Suggestion> suggestionList;


        if (option==1){

            suggestionList = suggestionRepository.findAllSuggestionByFid(fId);

        } else if(option==2){

            suggestionList = suggestionRepository.suggestionSortByPrice(fId);

        } else {

             suggestionList = suggestionRepository.suggestionSortByMoveCnt(fId);

        }

        for(Suggestion s : suggestionList){

            DetailSuggestionResponseDto detail = new DetailSuggestionResponseDto();

            detail.setP_id(s.getPId().getId());
            detail.setName(s.getPId().getName());
            detail.setProfile_url(s.getPId().getProfileUrl());
            detail.setP_move_cnt(s.getPId().getPMoveCnt());
            detail.setS_money(s.getSMoney());
            detail.setS_desc(s.getSDesc());
            detail.setS_create_time(s.getSModifyTime());

            if (s.getFId().getPId() == s.getPId()){
                detail.setIs_selected("t");
            } else {
                detail.setIs_selected("f");
            }

            resultList.add(detail);
        }
        return resultList;
    }


}
