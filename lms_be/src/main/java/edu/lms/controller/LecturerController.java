package edu.lms.controller;

import edu.lms.service.LecturerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/lecturers")
@Slf4j
public class LecturerController {
    private final LecturerService lecturerService;

    @RequestMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> findAllLecturers(
            @RequestParam(required = true) Boolean paged,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {

        if (Boolean.FALSE.equals(paged)) {
            return ResponseEntity.ok(lecturerService.findAllLecturers());
        }
        return ResponseEntity.ok(lecturerService.findAllLecturers(page, size));
    }
}
