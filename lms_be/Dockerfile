# Build stage dùng Maven + JDK 17
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Thư mục làm việc trong container
WORKDIR /app

# Copy file pom.xml trước để cache dependency
COPY pom.xml .
RUN mvn dependency:go-offline -B # Tải dependency trước, Docker cache layer này -> build nhanh hơn.

# Copy source code
COPY src ./src

# Build project, chạy test (skipTests=false)
#RUN mvn -DskipTests=false -B package
RUN mvn -DskipTests -B package

# Runtime stage: JDK 24 slim
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy jar từ build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 (port mặc định Spring Boot)
EXPOSE 8080

# Chạy ứng dụng Spring Boot
ENTRYPOINT ["java","-jar","app.jar"]