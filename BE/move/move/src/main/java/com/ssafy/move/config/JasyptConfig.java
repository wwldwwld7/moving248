package com.ssafy.move.config;

import lombok.extern.slf4j.Slf4j;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class JasyptConfig {

    @Value("${jasypt.encryptor.password}")
    private String key;
    private static final String pbeWithMD5AndDES = "PBEWithMD5AndDES";

    @Bean("jasyptStringEncryptor")
    public StringEncryptor stringEncryptor() {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();
        config.setPassword(key);    // 암호화 키
        config.setAlgorithm(pbeWithMD5AndDES);  // 암호화 알고리즘
        config.setKeyObtentionIterations("1000");   // 반복할 해싱 횟수
        config.setPoolSize("1");    // 인스턴스 pool 이게뭘까...
        config.setProviderName("SunJCE");   // 프로바이더, 왜 쓰는 거지
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");  // 랜덤 Salt 사용 가능하게 해주는데 그러면 복호화 할 때 Salt값도 넘겨줘야하잖아..
        // 근데 왜 잘 작동되는거지??? 이해할수가없네...
        config.setIvGeneratorClassName("org.jasypt.iv.NoIvGenerator");    // 뭔지 모르겠다
        config.setStringOutputType("base64");   // 인코딩
        encryptor.setConfig(config);




        return encryptor;
    }
}
