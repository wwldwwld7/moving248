package com.ssafy.move.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PReviewDto {
    private int r_id;
    private String name;
    private int r_rate;
    private String r_content;
    private String r_create_time;
}
