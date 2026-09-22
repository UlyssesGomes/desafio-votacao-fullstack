package com.votacao.app.enums;

public enum ClienteVotoStatusEnum {
    ABLE_TO_VOTE("ABLE_TO_VOTE"),
    UNABLE_TO_VOTE("UNABLE_TO_VOTE");

    private String status;
    ClienteVotoStatusEnum(String status) {
        this.status = status;
    }

    public String getValue() {return status;}
}
