package com.ssafy.move.domain;

import com.ssafy.move.dto.request.ApplyFormRequestDto;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "apply_form")
@Data
public class ApplyForm {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "f_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id", referencedColumnName = "m_id")
    private Members uId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_id", referencedColumnName = "m_id")
    private Members pId;

    @Column(name = "f_category", length = 1)
    private char fCategory;

    @Column(name = "f_date")
    private String fDate;

    @Column(name = "f_dep_sido")
    private String fDepSido;

    @Column(name = "f_dep_gungu")
    private String fDepGungu;

    @Column(name = "f_dep_ev", length = 1)
    private char fDepEv;

    @Column(name = "f_dep_ladder", length = 1)
    private char fDepLadder;

    @Column(name = "f_arr_sido")
    private String fArrSido;

    @Column(name = "f_arr_gungu")
    private String fArrGungu;

    @Column(name = "f_arr_ev", length = 1)
    private char fArrEv;

    @Column(name = "f_arr_ladder", length = 1)
    private char fArrLadder;

    @Column(name = "f_room_video_url")
    private String fRoomVideoUrl;

    @Column(name = "f_status", length = 1)
    private char fStatus;

    @Column(name = "f_create_time", insertable = false)
    private String fCreateTime;


    @Column(name = "f_req_desc")
    private String fReqDesc;

    @Column(name = "f_modify_time")
    private String fModifyTime;



}
