package edu.lms.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.ToString;

@Schema(description = "Request payload to login account")
@Data
@ToString
public class AuthRequest {

    @Schema(description = "Email address of the user", example = "admin@example.com")
    private String email;

    private String password;
}

