package com.ssafy.move.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SuggestionRequestDto {

    private int p_id;
    private int s_money;
    private String s_desc;



}
