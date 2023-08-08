package com.ssafy.move.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplyListResponseDto {

    private int f_id;
    private int u_id;
    private int p_id;
    private int f_status;
    private String f_date;
    private String f_dep_sido;
    private String f_dep_sido_name;
    private String f_dep_gungu;
    private String f_dep_gungu_name;
    private String f_arr_sido;
    private String f_arr_sido_name;
    private String f_arr_gungu;
    private String f_arr_gungu_name;
    private String f_category;


}