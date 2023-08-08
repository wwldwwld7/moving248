package com.ssafy.move.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpPartnerRequest {
    private final String name;

    private final String phone;

    private final String email;

    private final String password;

    private final String p_code;

    private final String p_ceo;

    private final String p_exp;

    private final String p_location;

    private final String profile_url;
}
