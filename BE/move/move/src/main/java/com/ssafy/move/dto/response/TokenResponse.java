package com.ssafy.move.dto.response;

import com.ssafy.move.domain.Members;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenResponse {

    private final String accessToken;

    private final String refreshToken;

    private final int m_id;

    private final String email;

    private final char memberType;

    private final String name;


}
