package com.ssafy.move.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LogInRequest {
    private final String email;

    private final String password;
}
