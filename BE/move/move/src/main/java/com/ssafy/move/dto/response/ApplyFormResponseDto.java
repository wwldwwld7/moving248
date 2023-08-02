package com.ssafy.move.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class ApplyFormResponseDto {

    private int f_id;
    private String f_status;
    private String f_date;
    private String f_dep_sido;
    private String f_dep_gungu;
    private String f_arr_sido;
    private String f_arr_gungu;
    private char f_category;

    public ApplyFormResponseDto(int f_id, String f_status, String f_date, String f_dep_sido, String f_dep_gungu, String f_arr_sido, String f_arr_gungu, char f_category) {
        this.f_id = f_id;
        this.f_status = f_status;
        this.f_date = f_date;
        this.f_dep_sido = f_dep_sido;
        this.f_dep_gungu = f_dep_gungu;
        this.f_arr_sido = f_arr_sido;
        this.f_arr_gungu = f_arr_gungu;
        this.f_category = f_category;
    }
}
