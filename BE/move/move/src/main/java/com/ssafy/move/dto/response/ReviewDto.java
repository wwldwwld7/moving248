package com.ssafy.move.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {

    private int r_id;
    private int r_rate;
    private String r_content;
    private String f_date;
    private String name;
    private int s_money;
}
