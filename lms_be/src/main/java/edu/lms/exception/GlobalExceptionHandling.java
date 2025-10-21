package edu.lms.exception;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandling {

    @ExceptionHandler(ObjectExistingException.class)
    public ResponseEntity<String> handleObjectNotFoundException(ObjectExistingException e) {
        log.error("Service - handleObjectNotFoundException {}", e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());

    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e) {
        log.error("Illegal Argument Exception {} ", e.getMessage());

        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(IllegalAccessException.class)
    public ResponseEntity<?> handleObjectNotFoundException(IllegalAccessException e) {
        log.error("Illegal Access Exception {} ", e.getMessage());
        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<?> handleExpiredJwtException(ExpiredJwtException e) {
        log.error("Expired Jwt Exception {} ", e.getMessage());
        return ResponseEntity.badRequest().build();
    }
}
