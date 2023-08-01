package com.ssafy.move.service;

import com.ssafy.move.domain.ChatMessages;
import com.ssafy.move.domain.ChatRoom;
import com.ssafy.move.domain.Members;
import com.ssafy.move.dto.response.ChatRoomResponseDto;
import com.ssafy.move.dto.response.MessageResponseDto;
import com.ssafy.move.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    @Transactional
    public List<ChatRoomResponseDto> findUserChatRoom(int m_id){
        List<ChatRoomResponseDto> list = new ArrayList<>();
        List<ChatRoom> allRoom = chatRepository.findAllRoom(m_id);
        for(ChatRoom cr : allRoom){
            boolean noread = chatRepository.findNoRead(cr,m_id);
            ChatRoomResponseDto crdto = new ChatRoomResponseDto(cr.getId()
            ,cr.getPId().getId() , cr.getPId().getProfileUrl(),cr.getPId().getName()
            ,cr.getRoomLastMessage(),cr.getRoomLastDate(),noread);
            list.add(crdto);
        }
        return list;
    }

    @Transactional
    public List<ChatRoomResponseDto> findPartnerChatRoom(int m_id) {
        List<ChatRoomResponseDto> list = new ArrayList<>();
        List<ChatRoom> allRoom = chatRepository.findAllRoom(m_id);
        for(ChatRoom cr : allRoom){
            boolean noread = chatRepository.findNoRead(cr,m_id);
            ChatRoomResponseDto crdto = new ChatRoomResponseDto(cr.getId()
                    ,cr.getUId().getId(), cr.getUId().getProfileUrl(),cr.getUId().getName()
                    ,cr.getRoomLastMessage(),cr.getRoomLastDate(),noread);
            list.add(crdto);
        }
        return list;
    }

    @Transactional
    public List<MessageResponseDto> findMessage(int p_id,int u_id,int m_id){
        List<MessageResponseDto> list = new ArrayList<>();
        ChatRoom room = chatRepository.findRoomId(p_id,u_id);
        if(room==null) {
            System.out.println("없음");
            return list;
        }
        List<ChatMessages> allmessages = chatRepository.findMessage(room.getId());
        for(ChatMessages cm : allmessages){
            MessageResponseDto mdto = new MessageResponseDto(
                    cm.getMId().getId(),cm.getCMessage(),cm.getCWriteDate()
            );
            if(cm.getMId().getId()!=m_id){
                cm.setCReadYn('t');
            }
            list.add(mdto);
        }
        return list;
    }

    @Transactional
    public void writeMessage(int p_id, int u_id, Map<String, String> map) {
        ChatRoom room = chatRepository.findRoomId(p_id,u_id);
        ChatMessages chatMessages = new ChatMessages();
        if(room==null) {
            System.out.println("없음");
            Members uMember = chatRepository.findMember(u_id);
            System.out.println(uMember+" "+u_id);
            Members pMember = chatRepository.findMember(p_id);
            room = new ChatRoom();
            room.setUId(uMember);
            room.setPId(pMember);
            room.setRoomLastDate(getCurrentTime());
            room.setRoomLastMessage(map.get("message"));
            chatRepository.createRoom(room);
            chatMessages.setRoomId(room);
            Members member = chatRepository.findMember(Integer.parseInt(map.get("m_id")));
            chatMessages.setMId(member);
            chatMessages.setCMessage(map.get("message"));
            chatRepository.writeMessage(chatMessages);

        }else{
            room.setRoomLastDate(getCurrentTime());
            room.setRoomLastMessage(map.get("message"));
            chatMessages.setRoomId(room);
            Members member = chatRepository.findMember(Integer.parseInt(map.get("m_id")));
            chatMessages.setMId(member);
            chatMessages.setCMessage(map.get("message"));
            chatRepository.writeMessage(chatMessages);
        }
    }
    public boolean checkNoRead(int m_id) {
        List<ChatRoom> allRoom = chatRepository.findAllRoom(m_id);
        boolean flag = false;
        for(ChatRoom cr : allRoom){
            boolean noread = chatRepository.findNoRead(cr,m_id);
            if(noread) {
                flag=true;
                break;
            }
        }

        return flag;

    }

    public String getCurrentTime(){
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss"; //hhmmss로 시간,분,초만 뽑기도 가능
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }


}
