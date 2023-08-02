package com.ssafy.move.jwt;

import com.ssafy.move.service.MemberDetailsService;
import io.jsonwebtoken.JwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final MemberDetailsService memberDetailsService;

    public JwtAuthenticationFilter(JwtProvider jwtProvider, MemberDetailsService memberDetailsService) {
        this.jwtProvider = jwtProvider;
        this.memberDetailsService = memberDetailsService;
    }

    //토큰 권한 확인을 위한 request가 도착하면
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
       //request에서 토큰 빼온다.
        String authorization = request.getHeader("Authorization");
        if(!Objects.isNull(authorization)){
            //만약 보낼때 "bearer "+토큰 이렇게 보냈으면 앞에 7글자를 없앤다.
            String atk = authorization.substring(7);
            try{
                //토큰에서 멤버의 정보를 가져온다.
                Token tk = jwtProvider.getToken(atk);
                System.out.println(tk.getEmail());
                //멤버가 db에 존재하는지 찾아본다.
                UserDetails userDetails = memberDetailsService.loadUserByUsername(tk.getEmail());
                Authentication token = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(token);
            }catch (JwtException e){
                request.setAttribute("exception", e.getMessage());
            }
        }
        filterChain.doFilter(request, response);
    }

}
