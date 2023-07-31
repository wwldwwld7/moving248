package com.ssafy.move.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "move_category")
@Entity
@Data
public class MoveCategory {

    @Id
    @Column(name = "category_code", length = 1)
    private char categoryCode;

    @Column(name = "category_name", length = 10, nullable = false)
    private String categoryName;


}
