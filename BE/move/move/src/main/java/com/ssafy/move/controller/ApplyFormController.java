package com.ssafy.move.controller;


import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.dto.request.ApplyFormRequestDto;
import com.ssafy.move.dto.request.SuggestionRequestDto;
import com.ssafy.move.dto.response.*;
import com.ssafy.move.service.ApplyFormService;
import com.ssafy.move.service.SuggestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/form")
@RequiredArgsConstructor
public class ApplyFormController {

    private final ApplyFormService applyFormService;
    private final SuggestionService suggestionService;


    // 신청서 유무
    @GetMapping("/user/{m_id}")
    public ResponseEntity<?> existForm(@PathVariable int m_id){

        Map<String, Boolean> map = new HashMap<>();

        boolean existForm = applyFormService.existForm(m_id);
        System.out.println(existForm);

        map.put("is_form_empty", existForm);

        return new ResponseEntity<Map<String, Boolean>>(map, HttpStatus.OK);
    }


    // 신청서 작성
    @PostMapping
    public ResponseEntity<?> writeForm(@RequestBody ApplyFormRequestDto applyFormRequestDto){


        applyFormService.writeForm(applyFormRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body("작성완료");

    }

    // 신청서 수정
    @PutMapping("/{f_id}")
    public ResponseEntity<?> updateForm(@PathVariable int f_id, @RequestBody ApplyFormRequestDto applyFormRequestDto){

        applyFormService.updateApplyForm(f_id, applyFormRequestDto);

        return new ResponseEntity<String>("수정완료", HttpStatus.OK);
    }

    // 신청서 삭제
    @DeleteMapping("/{f_id}")
    public ResponseEntity<?> deleteForm(@PathVariable int f_id){

        applyFormService.deleteApplyForm(f_id);

        return new ResponseEntity<String>("삭제성공", HttpStatus.OK);

    }

    // 신청서 전체조회
    @GetMapping
    public ResponseEntity<?> findAllApplyForm(){

        Map<String,Object> map = new HashMap<>();

        List<ApplyFormResponseDto> allApplyForm = applyFormService.findAll();

        map.put("data", allApplyForm);

        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);

    }

    // 신청서 주소별 조회
    @GetMapping("/{sido}/{gungu}/{category}/{p_id}")
    public ResponseEntity<?> findApplyByCategory(@PathVariable String sido, @PathVariable String gungu,
                                                 @PathVariable int category, @PathVariable int p_id) {

            Map<String, Object> map = new HashMap<>();

        List<ApplyFormResponseDto> applyByCategory = applyFormService.findApplyByCategory(sido, gungu, category, p_id);

        map.put("data", applyByCategory);

        return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
    }

    // 신청서 상세 조회
    @GetMapping("/{f_id}")
    public ResponseEntity<?> findApplyById(@PathVariable int f_id){

        Map<String, Object> map = new HashMap<>();

        DetailApplyFormResponseDto detailApply = applyFormService.findDetailApplyById(f_id);

        map.put("data", detailApply);


        return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);

    }

    
    // 이사완료
    @PutMapping("/status/{f_id}")
    public ResponseEntity<?> updateFormStatus(@PathVariable int f_id){

        applyFormService.updateFormStatus(f_id);

        return new ResponseEntity<String>("이사가 완료되었습니다", HttpStatus.OK);
    }

    
    // 시도 가져오기
    @GetMapping("/sido")
    public ResponseEntity<?> getSido(){

        Map<String, Object> map = new HashMap<>();

        List<SidoResponseDto> sidoList = applyFormService.getSido();

        map.put("data", sidoList);

        return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
    }

    // 군구 가져오기
    @GetMapping("/gu/{sido}")
    public ResponseEntity<?> getGu(@PathVariable String sido){

        Map<String, Object> map = new HashMap<>();


        List<GuResponseDto> guList = applyFormService.getGu(sido);

        map.put("data", guList);

        return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
    }

    // 견적서 작성
    @PostMapping("/suggestion/{f_id}")
    public ResponseEntity<?> writeSuggestion(@PathVariable int f_id,
                                             @RequestBody SuggestionRequestDto suggestionRequestDto){

        suggestionService.writeSuggestion(f_id, suggestionRequestDto);

        return new ResponseEntity<String>("견적서 등록이 완료되었습니다", HttpStatus.OK);
    }

    // 견적서 수정
    @PutMapping("/suggestion/{f_id}")
    public ResponseEntity<?> updateSuggestion(@PathVariable int f_id,
                                              @RequestBody SuggestionRequestDto suggestionRequestDto){

        suggestionService.updateSuggestion(f_id, suggestionRequestDto);

        return new ResponseEntity<String>("견적서 수정이 완료되었습니다", HttpStatus.OK);
    }

    // 견적서 삭제
    @DeleteMapping("/suggestion/{f_id}/{p_id}")
    public ResponseEntity<?> deleteSuggestion(@PathVariable int f_id, @PathVariable int p_id){

        suggestionService.deleteSuggestion(f_id, p_id);

        return new ResponseEntity<String>("견적서 삭제가 완료되었습니다", HttpStatus.OK);
    }

    // 견적서 확정
    @PutMapping("/suggestion/{f_id}/{p_id}")
    public ResponseEntity<?> confirmSuggestion(@PathVariable int f_id, @PathVariable int p_id){

        suggestionService.confirmSuggestion(f_id, p_id);

        return new ResponseEntity<String>("확정되었습니다", HttpStatus.OK);
    }

    // 견적서 확정취소
    @PutMapping("/suggestion/{f_id}/{u_id}/{p_id}")
    public ResponseEntity<?> cancelSuggestion(@PathVariable int f_id, @PathVariable int u_id,
                                              @PathVariable int p_id){

        suggestionService.cancelSuggestion(f_id, u_id, p_id);

        return new ResponseEntity<String>("확정 취소되었습니다", HttpStatus.OK);

    }

    // 견적서 정렬
    @GetMapping("/{f_id}/{option}")
    public ResponseEntity<?> sortSuggestion(@PathVariable int f_id, @PathVariable int option){

        List<DetailSuggestionResponseDto> resultList = suggestionService.sortSuggestion(f_id, option);

        return new ResponseEntity<List<DetailSuggestionResponseDto>>(resultList, HttpStatus.OK);
    }







}
