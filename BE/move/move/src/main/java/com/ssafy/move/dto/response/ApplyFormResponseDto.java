package com.ssafy.move.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplyFormResponseDto {

    private int f_id;
    private String f_status;
    private String f_date;
    private String f_dep_sido;
    private String f_dep_gungu;
    private String f_arr_sido;
    private String f_arr_gungu;
    private String f_category;


}
