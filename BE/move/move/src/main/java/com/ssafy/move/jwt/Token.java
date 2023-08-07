package com.ssafy.move.jwt;

import lombok.Getter;

@Getter
public class Token {

    private final String email;

    private final String name;

    private final String tkType;

    private Token(String email, String name, String tkType) {
        this.email = email;
        this.name = name;
        this.tkType = tkType;
    }

    public static Token atk(String email, String name){
        return new Token(email, name, "ATK");
    }

    public static Token rtk(String email, String name){
        return new Token(email, name, "RTK");
    }
}
