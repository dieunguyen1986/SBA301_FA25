package edu.lms.service;

import edu.lms.dto.CategoryResponse;
import edu.lms.entity.Category;
import edu.lms.exception.ObjectExistingException;
import edu.lms.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public Page<CategoryResponse> findAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return categoryRepository.findAll(pageRequest)
                .map((category) -> CategoryResponse.builder().id(category.getId()).name(category.getName()).build());
    }

    @Override
    public boolean createCategory(Category category) {
        // Lưu ý về business validate/rules
        log.info("Service - Creating new category {}", category);
        if (categoryRepository.existsByName(category.getName())) {
            throw new ObjectExistingException("Category with name " + category.getName() + " already exists");
        }

        // call other service
        categoryRepository.save(category);

        return true;
    }

    @Override
    public List<CategoryResponse> findAll() {
        return categoryRepository.findAll().stream()
                .map((category -> CategoryResponse.builder().id(category.getId()).name(category.getName()).description(category.getDescription()).build())).toList();
    }


}
