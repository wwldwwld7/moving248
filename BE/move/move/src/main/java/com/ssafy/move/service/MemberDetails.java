package com.ssafy.move.service;

import com.ssafy.move.domain.Members;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;
@Getter
public class MemberDetails extends User {
    private final Members members;

    public MemberDetails(Members members){
        super(members.getEmail(), members.getPassword(), List.of(new SimpleGrantedAuthority("USER")));
        this.members = members;
    }
}
