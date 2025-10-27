package edu.lms.controller;

import edu.lms.dto.ApiResponse;
import edu.lms.dto.AuthRequest;
import edu.lms.dto.AuthResponse;
import edu.lms.entity.User;
import edu.lms.security.JwtService;
import edu.lms.service.RefreshTokenService;
import edu.lms.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;

@Tag(name = "Auth API", description = "APIs for Authentication and Refresh Token")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserDetailsService userDetailsService;

    @Operation(summary = "Register a new User account",
            description = "The endpoint allows user to perform create a new user account",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(required = true, description = "User data to create", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthRequest.class))),
            responses = {
                @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "User created successfully"),
                @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request data")
            }
    )
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody User user) {
        ApiResponse apiResponse = userService.createUser(user);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 400)
                .body(apiResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest authRequest) {
        // Call service ? --> NO
        // Delegate to  AuthenticationManager auto loadUserByUsername
        log.info("Auth Request: {}", authRequest);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

        // Store authentication in security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Thao tác với context
        // SecurityContextHolder.getContext().getAuthentication();

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);
        log.info("User email: {}", userDetails.getUsername());
        // Save Refresh Token into DB
        refreshTokenService.saveRefreshToken(userDetails.getUsername(), refreshToken);

        log.info("Auth Token: {}", accessToken);
        log.info("Auth Refresh Token: {}", refreshToken);

        // Create HttpOnly Cookie that contain refresh token
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax") // "Strict" or "Lax"; CSRF Protection: enable if not use SameSite Strict
                .path("/")
                .maxAge(Duration.ofDays(7))
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(AuthResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build());
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshToken", required = false) String refreshToken,
                                          HttpServletResponse response) {

        // Cookie[] cookies = request.getCookies();
        log.info("Refresh Token: {}", refreshToken);

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Refresh Token Not Found"));
        }

        String username = jwtService.extractUsername(refreshToken);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (!jwtService.isValidToken(refreshToken, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid Token"));
        }

        String newAccessToken = jwtService.generateAccessToken(userDetails);

        log.info("New Access Token: {}", newAccessToken);
        return ResponseEntity.ok().body(Map.of("newAccessToken", newAccessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(name = "refreshToken", required = false) String refreshToken, HttpServletResponse response) {
        log.info("Logout Token: {}", refreshToken);

        if (refreshToken == null) {
           return ResponseEntity.ok().build();
        }

        refreshTokenService.revoke(refreshToken);

        ResponseCookie deletedCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax") // "Strict" or "Lax"; CSRF Protection: enable if not use SameSite Strict
                .maxAge(0)
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, deletedCookie.toString()).build();
    }

}
