package com.ssafy.move.controller;

import com.ssafy.move.dto.response.ChatRoomResponseDto;
import com.ssafy.move.dto.response.MessageResponseDto;
import com.ssafy.move.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;


    @GetMapping("/user/{u_id}")
    public ResponseEntity<Map<String,Object>> findUserChatRoom(@PathVariable("u_id")int m_id ){

        Map<String, Object> rsmap = new HashMap<>();
        List<ChatRoomResponseDto> userChatRoom = chatService.findUserChatRoom(m_id);

        rsmap.put("data",userChatRoom);

        return new ResponseEntity<Map<String, Object>>(rsmap,HttpStatus.OK);
    }

    @GetMapping("/partner/{p_id}")
    public ResponseEntity<Map<String,Object>> findPartnerChatRoom(@PathVariable("p_id")int m_id ){

        Map<String, Object> rsmap = new HashMap<>();
        List<ChatRoomResponseDto> partnerChatRoom = chatService.findPartnerChatRoom(m_id);
        rsmap.put("data",partnerChatRoom);

        return new ResponseEntity<Map<String, Object>>(rsmap,HttpStatus.OK);
    }


    @GetMapping("/message/{m_id}")
    public ResponseEntity<Map<String,Object>> existMessage(@PathVariable("m_id")int m_id ){

        Map<String, Object> rsmap = new HashMap<>();
        boolean noread_message = chatService.checkNoRead(m_id);
        rsmap.put("noread_message",noread_message);
        return new ResponseEntity<Map<String, Object>>(rsmap,HttpStatus.OK);
    }

    @GetMapping("/message/{p_id}/{u_id}/{m_id}")
    public ResponseEntity<Map<String,Object>> findMessage(@PathVariable("p_id")int p_id,@PathVariable("u_id")int u_id
    ,@PathVariable("m_id")int m_id){
        Map<String, Object> rsmap = new HashMap<>();
        List<MessageResponseDto> messages = chatService.findMessage(p_id,u_id,m_id);
        rsmap.put("data",messages);
        return new ResponseEntity<Map<String, Object>>(rsmap,HttpStatus.OK);
    }

    @PostMapping("/message/{p_id}/{u_id}")
    public ResponseEntity<Map<String,Object>> writeMessage(@PathVariable("p_id")int p_id,@PathVariable("u_id")int u_id
    ,@RequestBody Map<String, String> map){
        Map<String, Object> rsmap = new HashMap<>();
        chatService.writeMessage(p_id,u_id,map);
        rsmap.put("msg", "채팅입력 완료");
        return new ResponseEntity<Map<String, Object>>(rsmap,HttpStatus.OK);

    }



}
