package com.ssafy.move.dto.response;

import com.ssafy.move.domain.Members;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponse {
    private final String email;

    private final char memberType;

    private final String name;

    public static MemberResponse of(Members member){
        return new MemberResponse(
                member.getEmail(),
                member.getMemberType(),
                member.getName()
        );
    }
}
