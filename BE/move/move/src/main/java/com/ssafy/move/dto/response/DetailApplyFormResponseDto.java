package com.ssafy.move.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DetailApplyFormResponseDto {


    private int f_id;
    private int u_id;
    private int p_id;
    private String userName;
    private String f_category;
    private String f_date;
    private String f_dep_sido;
    private String f_dep_gungu;
    private char f_dep_ev;
    private char f_dep_ladder;
    private String f_arr_sido;
    private String f_arr_gungu;
    private char f_arr_ev;
    private char f_arr_ladder;
    private String f_room_video_url;
    private String f_req_desc;
    private int f_status;

    private int f_dep_sido_code;
    private int f_dep_gungu_code;
    private int f_arr_sido_code;
    private int f_arr_gungu_code;

    private List<DetailSuggestionResponseDto> list;



}
