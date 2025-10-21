package edu.lms.controller;

import edu.lms.dto.LessonRequest;
import edu.lms.dto.LessonResponse;
import edu.lms.service.LessonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
@Slf4j
public class LessonController {

    private final LessonService lessonService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
//    @PreAuthorize("hasAnyRole('ADMIN', 'LECTURER')")
    public ResponseEntity<LessonResponse> createLesson(
            @RequestPart("lesson") LessonRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        log.info("Received lesson: {}", request);
        log.info("Received file: {}", (file != null ? file.getOriginalFilename() : "none"));


        LessonResponse response = lessonService.createLesson(request, file);
        return ResponseEntity.ok(response);
    }
}
