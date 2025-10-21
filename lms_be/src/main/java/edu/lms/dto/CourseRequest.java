package edu.lms.dto;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class CourseRequest {
    private String courseCode;
    private String title;
    private double duration;
    private double price;
    private String description;
    private String status; // DRAFT, PUBLISHED
    private Long lecturerId;
    private Set<Long> categoryIds;
    private List<CourseSectionRequest> sections;
}
