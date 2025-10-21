package edu.lms.service;

import edu.lms.dto.ApiResponse;
import edu.lms.entity.Role;
import edu.lms.entity.User;
import edu.lms.repository.RoleRepository;
import edu.lms.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Value("${default.role}")
    private String defaultRole;

    @Transactional
    @Override
    public ApiResponse createUser(User user) {
        Optional<Role> role = roleRepository.findByName(defaultRole);

        if (!role.isPresent()) {
            throw new EntityNotFoundException("Role Not Found");
        }

        // Validate, Business rules username, email


        Set<Role> roles = Set.of(role.get());

        user.setRoles(roles);

        User result = userRepository.save(user); // detached
        return ApiResponse.builder().success(result != null)
                .message("Successfully created user")
                .build();
    }
}
