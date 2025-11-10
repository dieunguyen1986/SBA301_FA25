package edu.lms.controller;

import edu.lms.dto.CourseResponse;
import edu.lms.security.JwtAuthenticationFilter;
import edu.lms.security.JwtService;
import edu.lms.security.RestAuthenticationEntryPoint;
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
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CourseController.class)
@AutoConfigureMockMvc(addFilters = false)
class CourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CourseService courseService;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockitoBean
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Test
    @DisplayName("GET /public/courses - success with searchKeyword")
    void testGetCoursesWithKeyword() throws Exception {

        // GIVEN: mock data
        List<CourseResponse> mockCourses = List.of(
                new CourseResponse(1L, "SBA301", "Java Spring Boot", "Msr. Dieu"),
                new CourseResponse(2L, "RCT210","React Fundamentals", "Ms. Lan")
        );

        Page<CourseResponse> mockPage = new PageImpl<>(mockCourses);

        Mockito.when(courseService.findByKeyword(eq("java"), eq(0), eq(20)))
                .thenReturn(mockPage);

        // WHEN & THEN: perform request
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/public/courses")
                        .param("searchKeyword", "java")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title").value("Java Spring Boot"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].courseCode").value("SBA301"));
//                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lecturer").value("Msr. Dieu"));

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