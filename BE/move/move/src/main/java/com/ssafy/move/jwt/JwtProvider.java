package com.ssafy.move.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.move.dto.response.MemberResponse;
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

    public TokenResponse createTokenByLogin(MemberResponse memberResponse) throws JsonProcessingException {
        Token atk = Token.atk(
                memberResponse.getEmail(),
                memberResponse.getName()
        );

        String accessToken = createToken(atk, atkLive);

        return new TokenResponse(accessToken, null);
    }

    public String createToken(Token token, Long tokenLive) throws JsonProcessingException {
        String tokenStr = objectMapper.writeValueAsString(token);

        Claims claims = Jwts.claims()
                .setSubject(tokenStr);

        Date date = new Date();
        System.out.println(date.getTime());
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(date)
                .setExpiration(new Date(date.getTime() + tokenLive))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    //토큰의 권한 확인을 위한 요청이 들어오면
    //jwt payload에 있는 유저 정보를 Token으로 꺼낸다.
    public Token getToken(String atk) throws JsonProcessingException {
        String tokenStr = Jwts.parser().setSigningKey(key).parseClaimsJws(atk).getBody().getSubject();

        return objectMapper.readValue(tokenStr, Token.class);
    }

}
