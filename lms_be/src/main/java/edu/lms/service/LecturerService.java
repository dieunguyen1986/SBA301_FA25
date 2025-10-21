package edu.lms.service;

import edu.lms.dto.LecturerResponse;
import edu.lms.entity.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface LecturerService {
    Page<LecturerResponse> findAllLecturers(int page, int size);

    User findById(Long id);

    List<LecturerResponse> findAllLecturers();
}
