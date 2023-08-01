package com.ssafy.move.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpUserRequest {
    private final String name;

    private final String phone;

    private final String email;

    private final String password;
}
