package edu.lms.repository;

import edu.lms.dto.CourseResponse;
import edu.lms.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>, JpaSpecificationExecutor<Course> {
    // WebAppicationContext
    Page<Course> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    // JPQL: ?1
    @Query("FROM Course c WHERE (LOWER(c.status) = LOWER('PUBLISHED')) AND (LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword ,'%')) " +
            "OR LOWER(c.courseCode) LIKE LOWER(CONCAT('%',:keyword,'%')))")
    // JPQL
    // FROM Course c WHERE c.title LIKE ?1 --> keyword = %Java%
    Page<Course> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT new edu.lms.dto.CourseResponse(c.id, c.courseCode, c.title, c.duration," +
            " c.price,  c.status, c.description, ct.name, le.fullName, le.major) " +
            "FROM Course c " +
            "JOIN c.lecturer le " +
            "JOIN c.category ct WHERE le.email = :email")
//    @EntityGraph(value = "Course.findAllBySpecLecturer", type = EntityGraph.EntityGraphType.LOAD)
    Page<CourseResponse> findAllBySpecLecturer(@Param("email") String email, Pageable pageable);

    // Tìm theo mã khóa học
    Optional<Course> findByCourseCode(String courseCode);

    // Eager fetch Lecturer & Category
    @EntityGraph(value = "findAllBySpecLecturer")
    List<Course> findAll();

    boolean existsByCourseCode(String courseCode);
}
