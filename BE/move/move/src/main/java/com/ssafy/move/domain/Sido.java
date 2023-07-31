package com.ssafy.move.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sido")
@Data
public class Sido {

    @Id
    @Column(name = "sido_code", length = 2)
    private String sidoCode;

    @Column(name = "sido_name", length = 30)
    private String sidoName;


}
