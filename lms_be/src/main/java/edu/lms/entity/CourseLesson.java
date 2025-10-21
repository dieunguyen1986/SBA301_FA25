package edu.lms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(schema = "catalog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseLesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String videoUrl;
    private int duration; // phút
    private int orderIndex;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private LessonType lessonType;

    private Boolean isPreview = false; // Bài học có xem trước được không

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id")
    private CourseSection section;
}