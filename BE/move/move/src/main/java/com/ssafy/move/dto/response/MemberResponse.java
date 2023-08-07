package com.ssafy.move.dto.response;

import com.ssafy.move.domain.Members;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponse {
    private final int m_id;

    private final String email;

    private final char memberType;

    private final String name;

    public static MemberResponse of(Members member){
        return new MemberResponse(
                member.getId(),
                member.getEmail(),
                member.getMemberType(),
                member.getName()
        );
    }
}
