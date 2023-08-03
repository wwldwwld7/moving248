package com.ssafy.move.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "review")
@Data
public class Review {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "r_id")
    private int id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id",referencedColumnName = "m_id")
    private Members uId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_id",referencedColumnName = "m_id")
    private Members pId;

    @Column(name = "r_rate")
    private int rRate;

    @Column(name = "r_content")
    private String rContent;

    @Column(name = "r_create_time", insertable = false)
    private String rCreateTime;


}
