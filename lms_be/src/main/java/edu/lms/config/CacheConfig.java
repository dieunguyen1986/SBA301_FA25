package edu.lms.config;

import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.config.units.EntryUnit;
import org.ehcache.config.units.MemoryUnit;
import org.ehcache.jsr107.Eh107Configuration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import javax.cache.CacheManager;
import javax.cache.Caching;
import java.nio.file.Paths;
import java.time.Duration;
import java.io.File;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager customCacheManager() {

        // Xác định thư mục lưu cache trên disk
        // File cacheDirectory = new File(System.getProperty("java.io.tmpdir"), "ehcache-data");
        var path = Paths.get("/opt/app/ehcache-data");

        /*
             Định nghĩa kiểu key và value của cache. Ở đây key là Long (ID của entity), value là Object (bất kỳ entity nào).
         */
        var cacheConfig = CacheConfigurationBuilder.newCacheConfigurationBuilder(Long.class, Object.class,
                        ResourcePoolsBuilder.newResourcePoolsBuilder().heap(100, EntryUnit.ENTRIES)
                                .offheap(10, MemoryUnit.MB)
//                                .disk(100, MemoryUnit.MB, true)
                )
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofMinutes(10)))
                .build();

        var jcacheConfig = Eh107Configuration.fromEhcacheCacheConfiguration(cacheConfig);

        var cachingProvider = Caching.getCachingProvider();
        var cacheManager = cachingProvider.getCacheManager();

        cacheManager.createCache("edu.lms.entity.Course", jcacheConfig);
        cacheManager.createCache("edu.lms.entity.Category", jcacheConfig);

        return cacheManager;
    }
}
