package com.ssafy.move.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequestDto {
    private int u_id;
    private int p_id;
    private int r_rate;
    private String r_content;
}
