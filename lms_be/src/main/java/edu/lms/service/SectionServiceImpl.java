package edu.lms.service;

import edu.lms.dto.SectionRequest;
import edu.lms.dto.SectionResponse;
import edu.lms.entity.CourseSection;
import edu.lms.repository.SectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SectionServiceImpl implements SectionService {
    private final SectionRepository sectionRepository;


    @Override
    @Transactional
    public Page<SectionResponse> findAll(int page, int size) {
        return sectionRepository.findAll(PageRequest.of(page, size)).map((section) -> SectionResponse.builder()
                .id(section.getId())
                .title(section.getTitle())
                .orderIndex(section.getOrderIndex())
                .createAt(section.getCreateAt())
                .courseTitle(section.getCourse().getTitle())
                .build()
        );
    }

    @Override
    public CourseSection save(SectionRequest courseRequest) {
        return null;
    }

    @Override
    public CourseSection update(SectionRequest courseRequest) {
        return null;
    }

    @Override
    public CourseSection findOne(Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
