package edu.lms.controller;

import edu.lms.entity.Category;
import edu.lms.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class CategoryController {

    public final CategoryService categoryService;

    @PostMapping(path = "/categories")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createCategory(@Valid @RequestBody Category category) {
        log.debug("Creating new category {}", category);

        Category result = categoryService.createCategory(category); // Transient state

        // result: detached

        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/categories")
    @PreAuthorize("hasAnyRole('ADMIN', 'LECTURER')")
    public ResponseEntity<?> getAllCategories(
            @RequestParam(name = "paged", required = true) Boolean paged,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "10") Integer size) {

        if (Boolean.FALSE.equals(paged)) {
            return ResponseEntity.ok(categoryService.findAll());
        }

        return ResponseEntity.ok().body(categoryService.findAll(page, size));
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> findById(@PathVariable Long id) {
        Category category = categoryService.findById(id);

        log.info("Category found with id {}", category.getName());

        //log.info("Course list {}", category.getCourses());
        return ResponseEntity.ok().body(category);
    }

    @DeleteMapping("categories/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        Category removedCategory = categoryService.deleteCategory(id);

        log.info("Category removed with id {}", removedCategory.getId());
        return ResponseEntity.ok().build();
    }




}
