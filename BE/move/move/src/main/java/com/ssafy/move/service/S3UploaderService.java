package com.ssafy.move.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3UploaderService {

    // 환경을 local로 할건지 아니면 서버단에서 이용할 development로 할건지
    @Value("${spring.environment}")
    private String environment;

    // 파일이 저장되는 경로
    // 둘다 application.yml 에 설정한 경로로 시작
    @Value("${spring.file-dir}")
    private String rootDir;
    private String fileDir;

    private final AmazonS3Client amazonS3Client;

    // 시작할 때 프로파일에 맞는 파일 경로 설정
    @PostConstruct
    private void init(){
        if(environment.equals("local")){
            this.fileDir = System.getProperty("user.dir") + this.rootDir;


        } else if(environment.equals("development")){
            this.fileDir = this.rootDir;
        }
    }


    // 사용자에게 받은 파일 Multipartfile을 받아서 전환
    public String uploadFileByClient(MultipartFile multipartFile, String bucket, String dirName) throws IOException{
        // multipartfile을 file타입으로 바꿀수 없으면 에러


        File uploadFile = convert(multipartFile)
                .orElseThrow(()-> new IllegalArgumentException("error: MultiparFile -> File 변환 에러"));
        // dirName -> s3의 디렉토리


        return uploadToS3(uploadFile, bucket, dirName);
    }

    // s3로 업로드하기
    private String uploadToS3(File uploadFile, String bucket, String dirName) {

        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName(); // s3 에 저장될 이름

        System.out.println(fileName);

        // s3에 업로드
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead)); // 아무나 읽기 가능하게


        // s3에 저장되어있는 url 가져오기
        String uploadFileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

        // 로컬에 저장된 이미지 지우기
        //removeNewFile(uploadFile);

        return uploadFileUrl;
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("File delete success");
            return;
        }
        log.info("File delete fail");
    }
    


    // Multipartfile -> File
    private Optional<File> convert(MultipartFile multipartFile) throws IOException{


        if (multipartFile.isEmpty()){
            return Optional.empty();
        }
        // 비어있지 않으면
        String originalFileName = multipartFile.getOriginalFilename();
        String storeFileName = createStoreFileName(originalFileName); // uuid+확장자


        File file = new File(fileDir+storeFileName); // 저장될 경로 + 파일이름


        multipartFile.transferTo(file);

        return Optional.of(file);

    }

    // 업로드된 파일과 겹치지 않게 uuid를 사용
    private String createStoreFileName(String originalFileName) {

        String ext = extractExt(originalFileName);
        String uuid = UUID.randomUUID().toString();

        return uuid+"."+ext;
    }

    // 사용자가 업로드한 파일에서 확장자를 추출
    private String extractExt(String originalFileName) {
        int pos = originalFileName.lastIndexOf(".");
        return originalFileName.substring(pos+1); // . 다음부터인 확장자만 가져오려고
    }


}
