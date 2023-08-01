package com.ssafy.move.service;

import com.ssafy.move.domain.Members;
import com.ssafy.move.dto.request.LoginRequest;
import com.ssafy.move.dto.response.LoginResponse;
import com.ssafy.move.exception.BadRequestException;
import com.ssafy.move.repository.LogInRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    @Autowired
    private final LogInRepository logInRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse logIn(LoginRequest loginRequest){
        Members member = logInRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(()->new BadRequestException("존재하지 않는 이메일 입니다."));

        System.out.println(loginRequest.getEmail());
        boolean pwCheck = loginRequest.getPassword().equals(member.getPassword());
        if(!pwCheck) throw new BadRequestException("이메일 혹은 비밀번호를 확이하세요.");

        return LoginResponse.of(member);
    }

}
