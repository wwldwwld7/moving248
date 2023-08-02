package com.ssafy.move.controller;

import com.ssafy.move.dto.request.ReviewRequestDto;
import com.ssafy.move.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;


    @PostMapping("/review")
    public ResponseEntity<Map<String,Object>> writeReview(@RequestBody ReviewRequestDto reviewRequestDto){

        Map<String, Object> rsmap = new HashMap<>();
        reviewService.writeReview(reviewRequestDto);
        return new ResponseEntity<Map<String,Object>>(rsmap, HttpStatus.OK);
    }
}
