package com.ssafy.move.dto.request;


import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.domain.Members;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class ApplyFormRequestDto {

    private int m_id;
    private char f_category;
    private String f_date;
    private String f_dep_sido;
    private String f_dep_gungu;
    private char f_dep_ev;
    private char f_dep_ladder;
    private String f_arr_sido;
    private String f_arr_gungu;
    private char f_arr_ev;
    private char f_arr_ladder;
    //private String video_File;
    private String f_req_desc;





}
