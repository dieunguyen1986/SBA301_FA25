package edu.lms.repository;

import edu.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String userName);

    Optional<User> findByEmail(String email);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);

    List<User> findDistinctByRoles_Name(String roleName);


    default List<User> findAllLecturers() {
        return findDistinctByRoles_Name("ROLE_INSTRUCTOR");
    }
}
