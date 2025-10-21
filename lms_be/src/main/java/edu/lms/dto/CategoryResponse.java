package edu.lms.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CategoryResponse {


    private Long id;
    @NotBlank(message = "Category name is not blank")
    private String name;

    private String description;
}
