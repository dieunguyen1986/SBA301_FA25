package edu.lms.service;

import edu.lms.dto.CategoryResponse;
import edu.lms.entity.Category;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CategoryService {
    Page<CategoryResponse> findAll(int page, int size);

    boolean createCategory(Category category);

    List<CategoryResponse> findAll();
}
