package com.ssafy.move.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomResponseDto {
    private int room_id;
    private int m_id;
    private String profile_url;
    private String name;
    private String room_last_message;
    private String room_last_date;
    private boolean noread_message;
}
