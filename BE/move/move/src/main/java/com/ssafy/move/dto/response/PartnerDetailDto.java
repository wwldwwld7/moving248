package com.ssafy.move.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PartnerDetailDto {
    private int p_id;
    private String p_ceo;
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
    private List<PReviewDto> list;
}
