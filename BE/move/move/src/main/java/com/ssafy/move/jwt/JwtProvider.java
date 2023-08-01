package com.ssafy.move.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.move.dto.response.LoginResponse;
import com.ssafy.move.dto.response.TokenResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final ObjectMapper objectMapper;

    @Value("${spring.jwt.key}")
    private String key;

    @Value("${spring.jwt.live.atk}")
    private Long atkLive;

    @PostConstruct
    protected void init(){
        key = Base64.getEncoder().encodeToString(key.getBytes());
    }

    public TokenResponse createTokenByLogin(LoginResponse loginResponse) throws JsonProcessingException {
        Token atk = Token.atk(
                loginResponse.getEmail(),
                loginResponse.getName()
        );

        String accessToken = createToken(atk, atkLive);

        return new TokenResponse(accessToken, null);
    }

    public String createToken(Token token, Long tokenLive) throws JsonProcessingException {
        String tokenStr = objectMapper.writeValueAsString(token);

        Claims claims = Jwts.claims()
                .setSubject(tokenStr);

        Date date = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(date)
                .setExpiration(new Date(date.getTime() + tokenLive))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }
}
