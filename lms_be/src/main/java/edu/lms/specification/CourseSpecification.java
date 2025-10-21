package edu.lms.specification;

import edu.lms.dto.CourseFilterRequest;
import edu.lms.entity.Course;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;


public class CourseSpecification {
    public static Specification<Course> toSpecification(CourseFilterRequest courseFilterRequest) {
        return (root, criteriaQuery, criteriaBuilder) -> {

            Predicate courseName = criteriaBuilder.like(root.get("title"), "%Java%");
            Predicate coursePrice = criteriaBuilder.between(root.get("price"), 100, 5000);
            Predicate courseDescription = criteriaBuilder.like(root.get("description"), "%Java%");

            criteriaBuilder.and(courseName, coursePrice);


            return criteriaBuilder.conjunction();
        };
    }
}
