package com.ssafy.move.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.move.dto.request.*;
import com.ssafy.move.dto.response.MemberResponse;
import com.ssafy.move.dto.response.TokenResponse;
import com.ssafy.move.jwt.JwtProvider;
import com.ssafy.move.jwt.RedisService;
import com.ssafy.move.service.MemberDetails;
import com.ssafy.move.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.support.HttpRequestHandlerServlet;

import javax.servlet.http.HttpServletRequest;
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

    //회원탈퇴
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

    //로그아웃
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
    public TokenResponse reissue(@AuthenticationPrincipal MemberDetails memberDetails, HttpServletRequest request) throws JsonProcessingException {
//        System.out.println("권한"+request.getHeader("Authorization"));
        MemberResponse memberResponse = MemberResponse.of(memberDetails.getMembers());

        return jwtProvider.reissueAtk(memberResponse);
    }

    @GetMapping("/test")
    public String test(){
        return "good!";
    }

    //유저 정보 수정
    @PutMapping("/user/{m_id}")
    public ResponseEntity<String> updateUser(@PathVariable int m_id, @RequestBody UpdateUserRequest updateUserRequest, HttpServletRequest request) throws JsonProcessingException {
        memberService.updateUser(m_id, updateUserRequest, request);

        return new ResponseEntity<>("수정 완료", HttpStatus.OK);
    }

    //파트너 정보 수정
    @PutMapping("/partner/{m_id}")
    public ResponseEntity<String> updatePartner(@PathVariable int m_id, @RequestBody UpdatePartnerRequest updatePartnerRequest, HttpServletRequest request) throws JsonProcessingException {
        memberService.updatePartner(m_id, updatePartnerRequest, request);

        return new ResponseEntity<>("수정 완료", HttpStatus.OK);
    }
}
