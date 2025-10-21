package edu.lms.controller;

import edu.lms.dto.CourseResponse;
import edu.lms.service.CourseService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CourseController.class)
@AutoConfigureMockMvc
class CourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CourseService courseService;

    @Test
    @DisplayName("GET /public/courses - success with searchKeyword")
    void testGetCoursesWithKeyword() throws Exception {
        // GIVEN: mock data
        List<CourseResponse> mockCourses = List.of(
                new CourseResponse(1L, "Java Spring Boot", "Backend", "Msr. Dieu"),
                new CourseResponse(2L, "React Fundamentals", "Frontend", "Ms. Lan")
        );

        Page<CourseResponse> mockPage = new PageImpl<>(mockCourses);

        Mockito.when(courseService.findByKeyword(eq("java"), eq(0), eq(20)))
                .thenReturn(mockPage);

        // WHEN & THEN: perform request
        mockMvc.perform(MockMvcRequestBuilders.get("/public/courses")
                        .param("searchKeyword", "java")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title").value("Java Spring Boot"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].instructor").value("Ms. Lan"));

        Mockito.verify(courseService, Mockito.times(1))
                .findByKeyword("java", 0, 20);
    }

    @Test
    void updateCourse() {
    }

    @Test
    void createCourse() {
    }

    @Test
    void getCourseByLecturer() {
    }
}