package edu.lms.service;

import edu.lms.dto.ApiResponse;
import edu.lms.entity.User;

public interface UserService {
    ApiResponse createUser(User user);
}
