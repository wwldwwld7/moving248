package com.ssafy.move.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "gu")
@Data
public class Gu {

    @Id
    @Column(name = "gu_code", length = 2)
    private String guCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sido_code")
    private Sido sido;

    @Column(name = "gu_name", length = 30)
    private String guName;

}
