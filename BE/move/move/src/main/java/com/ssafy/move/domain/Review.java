package com.ssafy.move.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "review")
@Data
public class Review {

    @Id @GeneratedValue
    @Column(name = "r_id")
    private int id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id",insertable = false,updatable = false, referencedColumnName = "m_id")
    private Members uId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_id",insertable = false,updatable = false, referencedColumnName = "m_id")
    private Members pId;

    @Column(name = "r_rate", length = 1)
    private char rRate;

    @Column(name = "r_content")
    private String rContent;

    @Column(name = "r_create_time")
    private String rCreateTime;


}
