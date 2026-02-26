package com.app.mcm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "users") // safer than reserved keyword "user"
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(columnDefinition = "TEXT")
    private String address;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // --------- FUTURE RELATIONSHIPS (KEPT AS REQUESTED) ---------

//    @OneToMany(mappedBy = "user")
//    private List<Cart> carts;
//
//    @OneToMany(mappedBy = "user")
//    private List<Order> orders;
//
//    @OneToMany(mappedBy = "user")
//    private List<UserActivityLog> activityLogs;
//
//    @OneToMany(mappedBy = "user")
//    private List<AuditLog> auditLogs;

    // -----------------------------------------------------------

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}