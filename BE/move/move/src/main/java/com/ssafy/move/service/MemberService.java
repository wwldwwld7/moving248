package com.ssafy.move.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.move.domain.Members;
import com.ssafy.move.dto.request.*;
import com.ssafy.move.dto.response.MemberResponse;
import com.ssafy.move.exception.BadRequestException;
import com.ssafy.move.jwt.JwtProvider;
import com.ssafy.move.jwt.Token;
import com.ssafy.move.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    //유저 회원가입
    @Transactional
    public MemberResponse signUpUser(SignUpUserRequest signUpUserRequest){
        boolean isExist = memberRepository.existsByEmail(signUpUserRequest.getEmail());

        if(isExist) throw new BadRequestException("이미 존재하는 이메일 입니다.");

        String encodedPassword = passwordEncoder.encode(signUpUserRequest.getPassword());

        Members member = new Members();
        member.setMemberType('u');
        member.setName(signUpUserRequest.getName());
        member.setPhone((signUpUserRequest.getPhone()));
        member.setEmail(signUpUserRequest.getEmail());
        member.setPassword(encodedPassword);

        member = memberRepository.save(member);

        return MemberResponse.of(member);
    }
    
    //파트너 회원가입
    @Transactional
    public MemberResponse signUpPartner(SignUpPartnerRequest signUpPartnerRequest){
        boolean isExist = memberRepository.existsByEmail(signUpPartnerRequest.getEmail());

        if(isExist) throw new BadRequestException("이미 존재하는 이메일 입니다.");

        String encodedPassword = passwordEncoder.encode(signUpPartnerRequest.getPassword());

        Members member = new Members();
        member.setMemberType('p');
        member.setName(signUpPartnerRequest.getName());
        member.setPhone((signUpPartnerRequest.getPhone()));
        member.setEmail(signUpPartnerRequest.getEmail());
        member.setPassword(encodedPassword);
        member.setPCode(signUpPartnerRequest.getP_code());
        member.setPCeo(signUpPartnerRequest.getP_ceo());
        member.setPLocation(signUpPartnerRequest.getP_location());
        member.setProfileUrl(signUpPartnerRequest.getProfile_url());

        member = memberRepository.save(member);

        return MemberResponse.of(member);
    }

    @Transactional
    public void deleteMember(int id) {
        memberRepository.deleteById(id);
    }

    public MemberResponse logIn(LogInRequest logInRequest){
        Members member = memberRepository.findByEmail(logInRequest.getEmail())
                .orElseThrow(()->new BadRequestException("존재하지 않는 이메일 입니다."));

        //비밀번호가 인코딩 되어서 저장되면 이걸로 비교해야함.
        boolean pwCheck = passwordEncoder.matches(logInRequest.getPassword(), member.getPassword());
        //지금은 내가 데이터에 직접 값을 넣어서 인코딩 되어있지 않으니까 이거 썼음
//        boolean pwCheck = logInRequest.getPassword().equals(member.getPassword());
        if(!pwCheck) throw new BadRequestException("이메일 혹은 비밀번호를 확인하세요.");

        return MemberResponse.of(member);
    }

    @Transactional
    public void updateUser(int id, UpdateUserRequest updateUserRequest, HttpServletRequest request) throws JsonProcessingException {
        Members member = memberRepository.findById(id)
                .orElseThrow(()->new BadRequestException("유저가 존재하지 않습니다."));

        Token tk = jwtProvider.getToken(request.getHeader("Authorization"));

        if(!tk.getEmail().equals(member.getEmail())) throw new BadRequestException("토큰 정보가 다릅니다.");

        member.setPhone(updateUserRequest.getPhone());

        String encodedPassword = passwordEncoder.encode(updateUserRequest.getPassword());
        member.setPassword(encodedPassword);

        member = memberRepository.save(member);
    }

    @Transactional
    public void updatePartner(int id, UpdatePartnerRequest updatePartnerRequest, HttpServletRequest request) throws JsonProcessingException {
        Members member = memberRepository.findById(id)
                .orElseThrow(()->new BadRequestException("유저가 존재하지 않습니다."));

        Token tk = jwtProvider.getToken(request.getHeader("Authorization"));

        if(!tk.getEmail().equals(member.getEmail())) throw new BadRequestException("토큰 정보가 다릅니다.");

        member.setName(updatePartnerRequest.getName());
        member.setPCeo(updatePartnerRequest.getPCeo());
        member.setPExp(updatePartnerRequest.getPExp());
        member.setPhone(updatePartnerRequest.getPhone());
        member.setPEmpCnt(updatePartnerRequest.getPEmpCnt());
        member.setPStartTime(updatePartnerRequest.getPStartTime());
        member.setPEndTime(updatePartnerRequest.getPEndTime());
        member.setPDesc(updatePartnerRequest.getPDesc());
        member.setPLocation(updatePartnerRequest.getPLocation());
        member.setProfileUrl(updatePartnerRequest.getProfileUrl());

        String encodedPassword = passwordEncoder.encode(updatePartnerRequest.getPassword());
        member.setPassword(encodedPassword);

        member = memberRepository.save(member);
    }

}
