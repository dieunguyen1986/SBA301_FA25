package edu.lms.controller;

import edu.lms.dto.CourseRequest;
import edu.lms.dto.CourseResponse;
import edu.lms.entity.Course;
import edu.lms.repository.CourseRepository;
import edu.lms.service.CourseService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class CourseController {

    private final CourseService courseService;

    @GetMapping(path = "/public/courses")
    public ResponseEntity<List<CourseResponse>> getCourses(@RequestParam(required = false) String searchKeyword,
                                                           @RequestParam(required = false, defaultValue = "0") Integer page,
                                                           @RequestParam(required = false, defaultValue = "20") Integer size, HttpServletRequest request) {
//        request.getSession(true).setAttribute("searchKeyword", searchKeyword);

        Page<CourseResponse> result = courseService.findByKeyword(searchKeyword, page, size);

        return ResponseEntity.ok(result.getContent());
    }


    @PatchMapping
    public ResponseEntity<CourseResponse> updateCourse(@RequestBody CourseRequest courseRequest, Authentication authentication) {
        return ResponseEntity.ok(new CourseResponse());
    }

    // JSON --> BE (Object) --> Course
    @PostMapping("/lecturer/courses")
    public ResponseEntity<?> createCourse(@RequestBody CourseRequest courseRequest) {

        log.info("Creating course {}", courseRequest);

        return null;
    }

    @GetMapping(path = {"/lecturer/courses"})
    @PreAuthorize("hasAnyRole('ADMIN', 'LECTURER')")
    public ResponseEntity<List<CourseResponse>> getCourseByLecturer(@RequestParam String email, @RequestParam(required = false, defaultValue = "0") Integer page, @RequestParam(required = false, defaultValue = "10") Integer size) {

        log.info("Getting course by lecturer {}", email);

        Page<CourseResponse> courseResponses = courseService.findAllBySpecLecturer(email, page, size);

        return ResponseEntity.ok(courseResponses.getContent());
    }

}
