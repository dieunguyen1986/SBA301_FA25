package edu.lms.mapper;

import edu.lms.dto.CourseRequest;
import edu.lms.entity.Course;
import edu.lms.entity.User;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapperHelper.class, CategoryMapperHelper.class})
public interface CourseMapper {

    @Mapping(source = "lecturerId", target = "lecturer")
    @Mapping(source = "categoryIds", target = "category")
    @Mapping(source = "status", target = "status")
    Course toEntity(CourseRequest courseRequest);

    @InheritInverseConfiguration
    CourseRequest toDto(Course course);

//    default User map(Long id){
//        if(id == null){
//            return null;
//        }
//        User user = new User();
//        user.setId(id);
//        return user;
//    }
//
//    default Long map(User user){
//        if(user == null){
//            return null;
//        }
//        return user.getId();
//    }


}
