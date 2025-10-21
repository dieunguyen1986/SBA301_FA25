package edu.lms.service;

import edu.lms.dto.CourseFilterRequest;
import edu.lms.dto.CourseRequest;
import edu.lms.dto.CourseResponse;
import org.springframework.data.domain.Page;

public interface CourseService {
    Page<CourseResponse> findByKeyword(String keyword, int page, int size);

    CourseResponse saveOrUpdateCourse(CourseRequest courseRequest);

    Page<CourseResponse> findAllBySpecLecturer(String email, int page, int size);

    Page<CourseResponse> findAllBySpecs(CourseFilterRequest courseFilterRequest, int page, int size);


}
