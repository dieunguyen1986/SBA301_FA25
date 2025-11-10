package edu.lms.service;

import edu.lms.dto.CourseFilterRequest;
import edu.lms.dto.CourseRequest;
import edu.lms.dto.CourseResponse;
import edu.lms.entity.Course;
import edu.lms.exception.IllegalAccessException;
import edu.lms.repository.CourseRepository;
import edu.lms.specification.CourseSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service // IoC Container manage it - declare spring bean
@RequiredArgsConstructor
@Slf4j
public class CourseServiceImpl implements CourseService {
    private final ModelMapper modelMapper;
    private final CourseRepository courseRepository; // Inject Bean - best practice

    @Override
    public Page<CourseResponse> findByKeyword(String keyword, int page, int size) {
        // Optimize keyword
        String searchKeyword = (keyword == null || keyword.isBlank()) ? "" : keyword.trim();

        Pageable pageable = PageRequest.of(page, size);

        Page<Course> result = courseRepository.findByKeyword(searchKeyword, pageable);

        // Java 8 - Stream
        Page<CourseResponse> courseResponsePage = result.map((course -> {
            return CourseResponse.builder()
                    .id(course.getId())
                    .courseCode(course.getCourseCode())
                    .title(course.getTitle())
                    .price(course.getPrice())
                    .duration(course.getDuration())
                    .description(course.getDescription())
                    .lecturer(null).build();

        }));

        log.info("Course found with search keyword {}, found = {}", searchKeyword, result.getTotalElements());

        return courseResponsePage;
    }

    @Override
    public CourseResponse saveOrUpdateCourse(CourseRequest courseRequest) { // SQL123

        // Convert to Course

        courseRepository.save(convertToEntity(courseRequest));

        return null;

    }

    @Override
    public Page<CourseResponse> findAllBySpecLecturer(String email, int page, int size) {
        if (email == null || email.isBlank()) {
            throw new IllegalAccessException("You can't access this");
        }

        Pageable pageable = PageRequest.of(page, size);
        // logging
        return courseRepository.findAllBySpecLecturer(email, pageable);
    }

    @Override
    public Page<CourseResponse> findAllBySpecs(CourseFilterRequest courseFilterRequest, int page, int size) {

        courseRepository.findAll(CourseSpecification.toSpecification(courseFilterRequest), PageRequest.of(page, size));

        //convert to response
        return null;
    }

    private Course convertToEntity(CourseRequest courseRequest) {
        return modelMapper.map(courseRequest, Course.class);
    }

    private CourseResponse convertToDto(Course course) {
        return modelMapper.map(course, CourseResponse.class);
    }
}
