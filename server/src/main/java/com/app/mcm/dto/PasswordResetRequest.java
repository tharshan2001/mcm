package com.app.mcm.dto;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String email; // For request
    private String token; // For reset
    private String password;
}