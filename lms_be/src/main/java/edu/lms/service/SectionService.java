package edu.lms.service;

import edu.lms.dto.SectionRequest;
import edu.lms.dto.SectionResponse;
import edu.lms.entity.CourseSection;
import org.springframework.data.domain.Page;

public interface SectionService {
    Page<SectionResponse> findAll(int page, int size);

    CourseSection save(SectionRequest courseRequest);

    CourseSection update(SectionRequest courseRequest);

    CourseSection findOne(Long id);

    void delete(Long id);
}
