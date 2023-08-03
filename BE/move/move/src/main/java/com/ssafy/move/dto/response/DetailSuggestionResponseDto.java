package com.ssafy.move.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DetailSuggestionResponseDto {

    private int p_id;
    private String name;
    private String profile_url;
    private int p_move_cnt;
    private int s_money;
    private String s_desc;
    private String s_create_time;

}
