package com.ssafy.move.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.move.dto.request.LogInRequest;
import com.ssafy.move.dto.request.SignUpPartnerRequest;
import com.ssafy.move.dto.request.SignUpUserRequest;
import com.ssafy.move.dto.response.MemberResponse;
import com.ssafy.move.dto.response.TokenResponse;
import com.ssafy.move.jwt.JwtProvider;
import com.ssafy.move.jwt.RedisService;
import com.ssafy.move.service.MemberDetails;
import com.ssafy.move.service.MemberService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtProvider jwtProvider;
    private final RedisService redisService;

    //유저 회원가입
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

    //파트너 회원가입
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

    @DeleteMapping("/{m_id}")
    public ResponseEntity<String> deleteMember(@PathVariable("m_id") int m_id){
        memberService.deleteMember(m_id);

        return new  ResponseEntity<>("회원 탈퇴 완료", HttpStatus.OK);
    }

    //통합로그인
    @PostMapping("/login")
    public TokenResponse loginMember(@RequestBody LogInRequest logInRequest) throws JsonProcessingException {
        MemberResponse memberResponse = memberService.logIn(logInRequest);

        return jwtProvider.createTokenByLogin(memberResponse);
    }

    @GetMapping("/logout/{m_email}")
    public ResponseEntity<String> logoutMember(@PathVariable String m_email){
        redisService.deleteValue(m_email);
        if(Objects.isNull(redisService.getValues(m_email))){
            return new ResponseEntity<>("로그아웃 완료", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    //accesstoken 재발급
    @GetMapping("/reissue")
    public TokenResponse reissue(@AuthenticationPrincipal MemberDetails memberDetails) throws JsonProcessingException {
        MemberResponse memberResponse = MemberResponse.of(memberDetails.getMembers());

        return jwtProvider.reissueAtk(memberResponse);
    }

    @GetMapping("/test")
    public String test(){
        return "good!";
    }
}
