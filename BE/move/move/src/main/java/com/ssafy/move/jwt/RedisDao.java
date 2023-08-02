package com.ssafy.move.jwt;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class RedisDao {
    //redis 저장소에 key-value 쌍으로 데이터 create, delete
    private final RedisTemplate<String, String> redisTemplate;

    public RedisDao(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void setValue(String key, String data){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(key, data);
    }

    public void setValue(String key, String data, Duration duration){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(key, data, duration);
    }

    public String getValues(String key){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        System.out.println(values.get(key));
        return values.get(key);
    }

    public void deleteValue(String key){
        redisTemplate.delete(key);
    }

}
