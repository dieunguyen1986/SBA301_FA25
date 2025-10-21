package edu.lms.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LecturerResponse {
    private Long id;
    private String fullName;
    private String major;
    private String email;
}
