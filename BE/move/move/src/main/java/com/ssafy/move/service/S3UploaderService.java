package com.ssafy.move.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3UploaderService {

    // 환경을 local로 할건지 아니면 서버단에서 이용할 development로 할건지
    @Value("${spring.environment}")
    private String enviornment;

    // 파일이 저장되는 경로
    
    private String basicDir;
    private String fileDir;


    


}
