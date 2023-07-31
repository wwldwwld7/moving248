package com.ssafy.move.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "suggestion")
@Data
public class Suggestion {

    @Id @GeneratedValue
    @Column(name = "s_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "f_id")
    private ApplyForm fId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_id")
    private Members pId;

    @Column(name = "s_money")
    private int sMoney;

    @Column(name = "s_desc")
    private String sDesc;

    @Column(name = "s_create_time")
    private String sCreateTime;

    @Column(name = "s_modify_time")
    private String sModifyTime;





}
