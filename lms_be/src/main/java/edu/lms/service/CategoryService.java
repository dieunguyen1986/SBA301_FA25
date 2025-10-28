package edu.lms.service;

import edu.lms.dto.CategoryResponse;
import edu.lms.entity.Category;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {
    Page<CategoryResponse> findAll(int page, int size);

    Category createCategory(Category category);

    List<CategoryResponse> findAll();

    Category findById(long id);

    Category deleteCategory(Long id);
}
