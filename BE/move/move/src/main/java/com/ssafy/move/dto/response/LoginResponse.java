package com.ssafy.move.dto.response;

import com.ssafy.move.domain.Members;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private final String email;

    private final char memberType;

    private final String name;

    public static LoginResponse of(Members member){
        return new LoginResponse(
                member.getEmail(),
                member.getMemberType(),
                member.getName()
        );
    }
}
