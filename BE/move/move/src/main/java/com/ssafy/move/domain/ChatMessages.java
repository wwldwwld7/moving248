package com.ssafy.move.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "chat_messages")
@Data
public class ChatMessages {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "c_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private ChatRoom roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id")
    private Members mId;

    @Column(name = "c_message")
    private String cMessage;

    @Column(name = "c_read_yn", length = 1)
    private char cReadYn;

    @Column(name = "c_write_date")
    private String cWriteDate;


}
