package edu.lms.service;

import edu.lms.dto.CategoryResponse;
import edu.lms.entity.Category;
import edu.lms.exception.ObjectExistingException;
import edu.lms.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.ObjectNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public Page<CategoryResponse> findAll(int page, int size) {

        PageRequest pageRequest = PageRequest.of(page, size);

        Page<Category> categoryPage = categoryRepository.findAll(pageRequest);

        List<Category> categories = categoryPage.getContent();

        log.info("Course list {}", categories.get(0).getCourses()); // Query

        return categoryPage
                .map((category) -> CategoryResponse.builder().id(category.getId()).name(category.getName()).build());
    }



    @Override
    @Transactional
    public Category createCategory(Category category) {
        // Lưu ý về business validate/rules
        log.info("Service - Creating new category {}", category);
        if (categoryRepository.existsByName(category.getName())) {
            throw new ObjectExistingException("Category with name " + category.getName() + " already exists");
        }

        // call other service
        Category result = categoryRepository.save(category);  // persistence

        return result;
    }

    @Override
    public List<CategoryResponse> findAll() {
        return categoryRepository.findAll().stream()
                .map((category -> CategoryResponse.builder().id(category.getId()).name(category.getName()).description(category.getDescription()).build())).toList();
    }

    @Override
    @Transactional
    public Category findById(long id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    @Transactional
    public Category deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(()->{
            throw new ObjectNotFoundException("Category with name " + Category.class.getName() + " not found", id);
        });

//        Category categoryToDelete = new Category(); // Transient
//        categoryToDelete.setId(100L);

        log.info("Category removed {}", category);
        categoryRepository.delete(category);

        return category;
    }


}
