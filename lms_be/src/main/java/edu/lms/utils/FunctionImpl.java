package edu.lms.utils;

import edu.lms.dto.CourseResponse;
import edu.lms.entity.Course;

import java.util.function.Function;

public class FunctionImpl implements Function<Course, CourseResponse> {
    @Override
    public CourseResponse apply(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .courseCode(course.getCourseCode())
                .title(course.getTitle())
                .price(course.getPrice())
                .duration(course.getDuration())
                .description(course.getDescription())
                .lecturer(null)
                .build();
    }
}
