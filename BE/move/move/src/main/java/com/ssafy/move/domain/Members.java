package com.ssafy.move.domain;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "members")
@Data
public class Members {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "m_id")
    private int id;

    @Column(name = "member_type", length = 1)
    private char memberType;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "phone")
    private String phone;

    @Column(name = "name")
    private String name;

    @Column(name = "profile_url")
    private String profileUrl;

    @Column(name = "p_ceo")
    private String pCeo;

    @Column(name = "p_exp")
    private int pExp;

    @Column(name = "p_emp_cnt")
    private int pEmpCnt;

    @Column(name = "p_starttime")
    private String pStartTime;

    @Column(name = "p_endtime")
    private String pEndTime;

    @Column(name = "p_desc")
    private String pDesc;

    @Column(name = "p_location")
    private String pLocation;

    @Column(name = "p_move_cnt")
    private int pMoveCnt;

    @Column(name = "p_code")
    private String pCode;

    @Column(name = "p_total_score")
    private int pTotalScore;

    @Column(name = "p_review_cnt")
    private int pReviewCnt;

}
