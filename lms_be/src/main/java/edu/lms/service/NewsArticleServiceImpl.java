package edu.lms.service;

import edu.lms.entity.NewsArticle;
import edu.lms.repository.NewsArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NewsArticleServiceImpl implements NewsArticleService {
    private final NewsArticleRepository newsArticleRepository;

    @Override
    @Transactional
    public NewsArticle save(NewsArticle newsArticle) {
        return newsArticleRepository.save(newsArticle);
    }
}
