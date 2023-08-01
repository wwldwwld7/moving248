//package com.ssafy.move.service;
//
//import com.ssafy.move.domain.Members;
//import com.ssafy.move.repository.LogInRepository;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.transaction.annotation.Transactional;
//
//public class CustomLoginDetailsService implements UserDetailsService {
//
//    private final LogInRepository logInRepository;
//
//    public CustomLoginDetailsService(LogInRepository logInRepository) {
//        this.logInRepository = logInRepository;
//    }
//
//    @Override
//    @Transactional
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        //로그인 할 때 DB에서 유저정보 가져온다.
//        return logInRepository.findByEmail(email)
//                .map(members -> createMembers(email, members))
//                .orElseGet(()->new UsernameNotFoundException(email+" 데이터베이스에서 찾을 수 없습니다."));
//    }
//
//    private User createMembers(String email, Members members){
//        return User(members.getEmail(), members.getPassword());
//    }
//}
