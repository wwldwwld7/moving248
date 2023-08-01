package com.ssafy.move.service;

import com.ssafy.move.domain.Members;
import com.ssafy.move.dto.request.MemberRequest;
import com.ssafy.move.dto.response.MemberResponse;
import com.ssafy.move.exception.BadRequestException;
import com.ssafy.move.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    @Autowired
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberResponse logIn(MemberRequest memberRequest){
        Members member = memberRepository.findByEmail(memberRequest.getEmail())
                .orElseThrow(()->new BadRequestException("존재하지 않는 이메일 입니다."));

        System.out.println(memberRequest.getEmail());
        //비밀번호가 인코딩 되어서 저장되면 이걸로 비교해야함.
//        boolean pwCheck = passwordEncoder.matches(loginRequest.getPassword(), member.getPassword());
        //지금은 내가 데이터에 직접 값을 넣어서 인코딩 되어있지 않으니까 이거 썼음
        boolean pwCheck = memberRequest.getPassword().equals(member.getPassword());
        if(!pwCheck) throw new BadRequestException("이메일 혹은 비밀번호를 확인하세요.");

        return MemberResponse.of(member);
    }

}
