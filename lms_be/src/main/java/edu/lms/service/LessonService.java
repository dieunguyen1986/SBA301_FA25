package edu.lms.service;

import edu.lms.dto.LessonRequest;
import edu.lms.dto.LessonResponse;
import org.springframework.web.multipart.MultipartFile;

public interface LessonService {
    LessonResponse createLesson(LessonRequest request, MultipartFile file);
}
