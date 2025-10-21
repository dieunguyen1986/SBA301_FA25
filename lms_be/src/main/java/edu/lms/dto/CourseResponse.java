package edu.lms.dto;

import edu.lms.entity.CourseStatus;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseResponse {
    private Long id;
    private String courseCode;
    private String title;
    private double duration;
    private double price;
    private CourseStatus status;
    private String description;
    private String categoryName;
    private Integer amountSection;
    private Integer currentRating;
    private LecturerResponse lecturer;

    public CourseResponse(Long id, String courseCode, String title, String lecturer) {
        this.id = id;
        this.courseCode = courseCode;
        this.title = title;
        this.lecturer = LecturerResponse.builder().fullName(lecturer).build();

    }

    public CourseResponse(Long id, String courseCode, String title, double duration, double price, CourseStatus status,
                          String description, String categoryName, String fullName, String major) {
        this.id = id;
        this.courseCode = courseCode;
        this.title = title;
        this.duration = duration;
        this.price = price;
        this.status = status;
        this.description = description;
        this.categoryName = categoryName;
        this.lecturer = new LecturerResponse();
        this.lecturer.setFullName(fullName);
        this.lecturer.setMajor(major);
    }

}
