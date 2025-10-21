package edu.lms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(schema = "finance")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private String method; // CREDIT_CARD, PAYPAL, VN_PAY...
    private LocalDateTime paidAt;
    private String status; // SUCCESS, FAILED, PENDING

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enrollment_id", nullable = false, referencedColumnName = "id")
    private Enrollment enrollment;
}
