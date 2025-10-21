package edu.lms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

/**
 * Entity Permission ( Quyền hạn)
 * Example: READ_DOCUMENT, DELETE_USER, APPROVE_REQUEST.
 */
@Entity
@Table(name = "permissions", schema = "auth")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Slf4j
@Builder
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Using in hasAuthority()
    @Column(name = "permission_name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;
}