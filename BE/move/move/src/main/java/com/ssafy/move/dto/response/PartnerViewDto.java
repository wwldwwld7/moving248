package com.ssafy.move.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PartnerViewDto {
    private int p_id;
    private String name;
    private int p_exp;
    private int p_emp_cnt;
    private String p_starttime;
    private String p_endtime;
    private String p_desc;
    private String p_location;
    private String profile_url;
    private int p_move_cnt;
    private int p_total_score;
    private int p_review_cnt;
}
