package edu.lms.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SectionRequest {
    private Long id;
    @NotBlank(message = "Title is not blank")
    private String title;

    @Min(value = 1, message = "Order is invalid!")
    private int orderIndex;

    private Long courseId;
}
