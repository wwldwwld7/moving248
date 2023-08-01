package com.ssafy.move.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.move.dto.request.LoginRequest;
import com.ssafy.move.dto.response.LoginResponse;
import com.ssafy.move.dto.response.TokenResponse;
import com.ssafy.move.jwt.JwtProvider;
import com.ssafy.move.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;
    private final JwtProvider jwtProvider;

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest loginRequest) throws JsonProcessingException {
        LoginResponse loginResponse = loginService.logIn(loginRequest);

        return jwtProvider.createTokenByLogin(loginResponse);
    }
}
