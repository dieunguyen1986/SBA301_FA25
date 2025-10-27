package edu.lms.mapper;

import edu.lms.entity.Course;
import edu.lms.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapperHelper {
    public User map(Long id) {
        if (id == null) return null;
        User user = new User();
        user.setId(id);
        return user;
    }

    public Long map(User user) {
        if (user == null) return null;
        return user.getId();
    }
}