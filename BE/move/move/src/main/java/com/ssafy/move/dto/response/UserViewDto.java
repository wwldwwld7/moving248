package com.ssafy.move.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserViewDto {
    private String name;
    private String phone;
    private String email;
    private String password;
    private List<ReviewDto> list;
}
