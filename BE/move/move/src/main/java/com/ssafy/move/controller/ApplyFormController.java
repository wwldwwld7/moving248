package com.ssafy.move.controller;


import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.dto.request.ApplyFormRequestDto;
import com.ssafy.move.service.ApplyFormService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/form")
@RequiredArgsConstructor
public class ApplyFormController {

    private final ApplyFormService applyFormService;




    // 신청서 작성
    @PostMapping
    public ResponseEntity<?> writeForm(@RequestBody ApplyFormRequestDto applyFormRequestDto){

        System.out.println(applyFormRequestDto);

        applyFormService.writeForm(applyFormRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body("작성완료");

    }

//    // 신청서 수정
//    @PutMapping("/{f_id}")
//    public ResponseEntity<?> updateForm(){
//
//    }
//
//    // 신청서 삭제
//    @DeleteMapping("/{f_id}")
//    public ResponseEntity<?> deleteForm(){
//
//    }
//
//    // 신청서 조회
//    @GetMapping
//    public ResponseEntity<?> findApplyById(){
//
//    }
//
//    // 신청서 주소별 조회
//    @GetMapping("/{sido}/{gugun}/{category}/{p_id}")
//    public ResponseEntity<?> findApplyByCategory() {
//
//    }
//
//    // 신청서 상세 조회
//    @GetMapping("/{f_id}")
//    public ResponseEntity<?> findApplyById(){
//
//    }
//
//    // 제안서 정렬
//    @GetMapping("/{f_id}/{option}")
//    public ResponseEntity<?> sortSuggestion(){
//
//    }
    
    // 이사완료



}
