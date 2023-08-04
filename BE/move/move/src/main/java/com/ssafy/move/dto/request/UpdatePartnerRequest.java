package com.ssafy.move.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdatePartnerRequest {

    private String name;

    private String pCeo;

    private int pExp;

    private String phone;

    private String password;

    private int pEmpCnt;

    private String pStartTime;

    private String pEndTime;

    private String pDesc;

    private String pLocation;

    private String profileUrl;

}
