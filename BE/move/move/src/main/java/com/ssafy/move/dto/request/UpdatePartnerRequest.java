package com.ssafy.move.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdatePartnerRequest {

    private String name;

    private String p_ceo;

    private int p_exp;

    private String phone;

    private String password;

    private int p_emp_cnt;

    private String p_starttime;

    private String p_endtime;

    private String p_desc;

    private String p_location;

    private String profileUrl;

}
