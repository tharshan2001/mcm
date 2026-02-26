package com.app.mcm.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer adminId;

    private String fullName;
    private String email;
    private String phoneNumber;
    private String password;

    @Column(columnDefinition = "TEXT")
    private String permissions;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters and Setters
}