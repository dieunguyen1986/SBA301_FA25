package edu.lms.controller;

import edu.lms.entity.NewsArticle;
import edu.lms.service.NewsArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/news-articles")
@RequiredArgsConstructor
public class NewsArticleController {
    private final NewsArticleService newsArticleService;

    @PostMapping
//    @PermitAll
    public ResponseEntity<NewsArticle> save(@RequestBody NewsArticle newsArticle) {
        return ResponseEntity.ok(newsArticleService.save(newsArticle));

    }
}
