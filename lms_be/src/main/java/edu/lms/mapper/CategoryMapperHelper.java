package edu.lms.mapper;

import edu.lms.entity.Category;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class CategoryMapperHelper {
    public Set<Category> map(Set<Long> categoryIds) {
        return categoryIds.stream().map((id)-> Category.builder().id(id).build()).collect(Collectors.toSet());
    }

    public Set<Long> mapIds(Set<Category> categories) {
        return categories.stream().map(c -> c.getId()).collect(Collectors.toSet());
    }
}
