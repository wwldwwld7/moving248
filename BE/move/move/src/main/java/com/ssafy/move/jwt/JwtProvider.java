package com.ssafy.move.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.move.dto.response.MemberResponse;
import com.ssafy.move.dto.response.TokenResponse;
import com.ssafy.move.exception.BadRequestException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final RedisService redisService;
    private final ObjectMapper objectMapper;

    @Value("${spring.jwt.key}")
    private String key;

    @Value("${spring.jwt.live.atk}")
    private Long atkLive;

    @Value("${spring.jwt.live.rtk}")
    private Long rtkLive;

    @PostConstruct
    protected void init(){
        key = Base64.getEncoder().encodeToString(key.getBytes());
    }

    public TokenResponse createTokenByLogin(MemberResponse memberResponse) throws JsonProcessingException {
        Token atk = Token.atk(
                memberResponse.getEmail(),
                memberResponse.getName()
        );

        Token rtk = Token.rtk(
                memberResponse.getEmail(),
                memberResponse.getName()
        );

        String accessToken = createToken(atk, atkLive);
        String refreshToken = createToken(rtk, rtkLive);
        
        //redis에 refreshtoken저장
        redisService.setValue(memberResponse.getEmail(), refreshToken, Duration.ofMillis(rtkLive));

        return new TokenResponse(accessToken, refreshToken, memberResponse.getM_id(), memberResponse.getEmail(), memberResponse.getMemberType(), memberResponse.getName());
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

    //accesstoken 재발급
    public TokenResponse reissueAtk(MemberResponse memberResponse) throws JsonProcessingException {
        String rtkInRedis = redisService.getValues(memberResponse.getEmail());
//        System.out.println("레디스에서 가져옴"+rtkInRedis);
        if(Objects.isNull(rtkInRedis)) throw new BadRequestException("인증 정보가 만료되었습니다.");

        Token atk = Token.atk(
                memberResponse.getEmail(),
                memberResponse.getName()
        );
        String accessToken = createToken(atk, atkLive);
//        System.out.println("토큰프로바이더"+accessToken);

        return new TokenResponse(accessToken, null, memberResponse.getM_id(), memberResponse.getEmail(), memberResponse.getMemberType(), memberResponse.getName());
    }

    //토큰의 권한 확인을 위한 요청이 들어오면
    //jwt payload에 있는 유저 정보를 Token으로 꺼낸다.
    public Token getToken(String atk) throws JsonProcessingException {
        String tokenStr = Jwts.parser().setSigningKey(key).parseClaimsJws(atk).getBody().getSubject();

        return objectMapper.readValue(tokenStr, Token.class);
    }

}
