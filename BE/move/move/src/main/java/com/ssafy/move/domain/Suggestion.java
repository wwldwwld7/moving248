package com.ssafy.move.domain;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "suggestion")
@Data
@ToString
public class Suggestion {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "s_create_time", insertable = false)
    private String sCreateTime;

    @Column(name = "s_modify_time", insertable = false)
    private String sModifyTime;


}
