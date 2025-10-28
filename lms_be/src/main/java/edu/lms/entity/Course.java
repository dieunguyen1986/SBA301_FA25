package edu.lms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@EqualsAndHashCode(exclude = {"lecturer"})
@Table(schema = "catalog", uniqueConstraints = {@UniqueConstraint(name = "UNI_CODE", columnNames = {"course_code"})})
@NamedQueries(@NamedQuery(name = "findAll", query = "FROM Course c"))
@NamedEntityGraphs(@NamedEntityGraph(name = "findAllBySpecLecturer", attributeNodes = {@NamedAttributeNode("lecturer"), @NamedAttributeNode("category")}))
@ToString(exclude = {"sections", "enrollments", "category", "reviews", "lecturer"})
@Cacheable
@org.hibernate.annotations.Cache(region = "edu.lms.entity.Course", usage = CacheConcurrencyStrategy.READ_WRITE)
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_code")
    private String courseCode;

    @Column(columnDefinition = "NVARCHAR(200)")
    private String title;

    private double duration;
    private double price;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private CourseStatus status;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecturer_id", referencedColumnName = "id")
    private User lecturer;

    @ManyToMany
    @JoinTable(
            name = "CourseCategory", schema = "catalog",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> category = new HashSet<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseSection> sections = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseReview> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrollment> enrollments = new ArrayList<>();
}
