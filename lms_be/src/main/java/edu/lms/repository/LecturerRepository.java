package edu.lms.repository;

import edu.lms.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LecturerRepository extends JpaRepository<User, Long> {

    Page<User> findAllByRoles_Name(String name, Pageable pageable);

    List<User> findAllByRoles_Name(String name);

    default Page<User> findAllLecturers(Pageable pageable) {
        return findAllByRoles_Name("ROLE_LECTURER", pageable);
    }

    default List<User> findAllLecturers() {
        return findAllByRoles_Name("ROLE_LECTURER");
    }
}
