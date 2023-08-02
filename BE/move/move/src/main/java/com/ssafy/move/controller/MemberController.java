package com.ssafy.move.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.move.dto.request.LogInRequest;
import com.ssafy.move.dto.request.SignUpPartnerRequest;
import com.ssafy.move.dto.request.SignUpUserRequest;
import com.ssafy.move.dto.response.MemberResponse;
import com.ssafy.move.dto.response.TokenResponse;
import com.ssafy.move.jwt.JwtProvider;
import com.ssafy.move.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtProvider jwtProvider;

    @PostMapping("/user")
//    public LogInResponse signUp(@RequestBody SignUpUserRequest signUpUserRequest){
    public ResponseEntity<String> signUpUser(@RequestBody SignUpUserRequest signUpUserRequest){
        MemberResponse res = memberService.signUpUser(signUpUserRequest);
        if(signUpUserRequest.getEmail().equals(res.getEmail())){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
//        return memberService.signUp(signUpUserRequest);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/partner")
//    public LogInResponse signUp(@RequestBody SignUpUserRequest signUpUserRequest){
    public ResponseEntity<String> signUpPartner(@RequestBody SignUpPartnerRequest signUpPartnerRequest){
        MemberResponse res = memberService.signUpPartner(signUpPartnerRequest);
        if(signUpPartnerRequest.getEmail().equals(res.getEmail())){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
//        return memberService.signUp(signUpUserRequest);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public TokenResponse loginMember(@RequestBody LogInRequest logInRequest) throws JsonProcessingException {
        MemberResponse memberResponse = memberService.logIn(logInRequest);

        return jwtProvider.createTokenByLogin(memberResponse);
    }

    @GetMapping("/test")
    public String test(){
        return "good!";
    }
}
