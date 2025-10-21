package edu.lms.service;

import edu.lms.dto.LecturerResponse;
import edu.lms.entity.User;
import edu.lms.repository.LecturerRepository;
import edu.lms.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class LecturerServiceImpl implements LecturerService {
    private final UserRepository userRepository;
    private final LecturerRepository lecturerRepository;

    @Override
    public Page<LecturerResponse> findAllLecturers(int page, int size) {
        //        Sort.Order order = Sort.Order.asc("name");
        Pageable pageable = PageRequest.of(page, size, Sort.by("fullName").ascending());

        return lecturerRepository.findAllLecturers(pageable).map((lec) -> LecturerResponse.builder().id(lec.getId()).fullName(lec.getFullName()).email(lec.getEmail()).build());
    }

    @Override
    public User findById(Long id) {
        User lecturer = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Lecturer not found with id: " + id));

        boolean isLecturer = lecturer.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_LECTURER"));

        if (!isLecturer) {
            throw new IllegalArgumentException("User with id " + id + " is not a lecturer");
        }

        return lecturer;

    }

    @Override
    public List<LecturerResponse> findAllLecturers() {
        return lecturerRepository.findAllLecturers().stream().map((lec) -> LecturerResponse.builder().id(lec.getId()).email(lec.getEmail()).major(lec.getMajor()).fullName(lec.getFullName()).build()).toList();
    }


}
