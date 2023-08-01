package com.ssafy.move.repository;

import com.ssafy.move.domain.ChatMessages;
import com.ssafy.move.domain.ChatRoom;
import com.ssafy.move.domain.Members;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class ChatRepository {

    private final EntityManager em;

    public List<ChatRoom> findAllRoom(int m_id){
        List<ChatRoom> roomlist = em.createQuery(
                "select cr from ChatRoom cr where cr.pId.id=:m_id or cr.uId.id=:m_id " +
                        "order by cr.roomLastDate desc",
                        ChatRoom.class)
                .setParameter("m_id", m_id)
                .getResultList();

        return roomlist;
    }

    public List<ChatMessages> findMessage(int room_id){
        List<ChatMessages> messagesList = em.createQuery(
                "select cm from ChatMessages cm where cm.roomId.id=:room_id " +
                        "order by cm.cWriteDate", ChatMessages.class)
                .setParameter("room_id", room_id)
                .getResultList();
        return messagesList;
    }

    public ChatRoom findRoomId(int p_id,int u_id){
        List<ChatRoom> roomList = em.createQuery(
                        "select cr from ChatRoom cr where cr.pId.id = :p_id and cr.uId.id = :u_id", ChatRoom.class)
                .setParameter("p_id", p_id)
                .setParameter("u_id", u_id)
                .getResultList();
        ChatRoom roomResult = null;
        if (!roomList.isEmpty()) {
            // 여기서는 유일한 결과가 존재하는 경우에만 첫 번째 요소를 선택하도록 하였습니다.
            roomResult = roomList.get(0);
        }
        return roomResult;
    }


    public void writeMessage(ChatMessages chatMessages) {
        em.persist(chatMessages);
    }

    public Members findMember(int m_id){
        return em.find(Members.class, m_id);
    }

    public void createRoom(ChatRoom room) {
        em.persist(room);
    }

    public boolean findNoRead(ChatRoom cr, int m_id) {
        List<ChatMessages> cmList = em.createQuery("select cm from ChatMessages cm where cm.roomId.id=:room_id and cm.mId.id!=:m_id", ChatMessages.class)
                .setParameter("room_id", cr.getId())
                .setParameter("m_id",m_id)
                .getResultList();
        boolean flag = false;
        for(ChatMessages cm : cmList){
            if(cm.getCReadYn()=='f'){
                flag=true;
                break;
            }
        }
        return flag;
    }
}
