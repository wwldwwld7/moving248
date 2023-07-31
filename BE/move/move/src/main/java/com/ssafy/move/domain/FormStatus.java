package com.ssafy.move.domain;

import lombok.Data;

import javax.persistence.*;

@Table(name = "form_status")
@Entity
@Data
public class FormStatus {

    @Id
    @Column(name = "status_code", length = 1)
    private char statusCode;

    @Column(name = "status_name", length = 10, nullable = false)
    private String statusName;


}
