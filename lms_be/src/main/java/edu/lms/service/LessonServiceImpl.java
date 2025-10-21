package edu.lms.service;

import edu.lms.dto.LessonRequest;
import edu.lms.dto.LessonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
public class LessonServiceImpl implements LessonService {
    @Override
    public LessonResponse createLesson(LessonRequest request, MultipartFile file) {
        log.info("Creating lesson {}", request);
        log.info("File {}", file.getName());
        return null;
    }
}
