package com.donjo.backend.api.service.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Uploader {
    // AmazonS3Client 선언
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadFile(MultipartFile multipartFile,String category) throws IOException {
        // 현재시간을 가져옴
        LocalDateTime now = LocalDateTime.now();
        // 변수저장
        String myDateFormat = now.format(DateTimeFormatter.ofPattern("yyyyMMddhhmmss"));
        // 파일이름 카테고리 폴더에 시간값과 함께 파일 이름 저장
        String fileName =category+"/"+multipartFile.getName() + myDateFormat;

        // 객체 생성 Type과 Size를 가지고 옴
        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(multipartFile.getContentType());
        objectMetaData.setContentLength(multipartFile.getSize());

        // AmazonS3Client 객체를 사용하여 putObject 메소드를 호출하여 파일을 업로드 bucket은 업로드할 버킷 이름을 나타내고, fileName은 업로드될 파일의 이름입니다.
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, multipartFile.getInputStream(), objectMetaData));

        // 파일 이름을 반환 업로드된 파일의 이름을 클라이언트에게 전달하여 사용할 수 있도록 하는 것
        return fileName;
    }
}
