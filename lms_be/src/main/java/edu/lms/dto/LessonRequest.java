package edu.lms.dto;

import edu.lms.entity.LessonType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonRequest {

    @NotBlank(message = "Lesson title is required")
    private String title;

    private String description;

    @NotNull(message = "Order index is required")
    @Min(value = 1, message = "Order index must be >= 1")
    private Integer orderIndex;

    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be >= 1")
    private Integer duration;

    /**
     * Loại bài học: VIDEO, DOCUMENT, QUIZ, ...
     */
    @NotNull(message = "Lesson type is required")
    private LessonType lessonType;

    @Builder.Default
    private Boolean isPreview = false;

    @NotNull(message = "Section ID is required")
    private Long sectionId;
}
