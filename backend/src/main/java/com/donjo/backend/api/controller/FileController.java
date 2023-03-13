package com.donjo.backend.api.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.donjo.backend.api.service.S3.S3Uploader;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/file")
public class FileController {

    private final S3Uploader s3Upload;

        @PostMapping()
        @ApiOperation(value = "파일 업로드", notes = "example content")
        @ApiResponses({
                @ApiResponse(code = 200, message = "OK(조회 성공)"),
                @ApiResponse(code = 400, message = "BAD REQUEST(요청 실패)"),
                @ApiResponse(code = 500, message = "서버 오류")
        })
        public ResponseEntity<String> upload( @RequestParam String category,
                                              @RequestPart MultipartFile multipartFile) throws IOException {
                String fileName = s3Upload.uploadFile(multipartFile,category);
                System.out.println("https://don-jo.s3.ap-northeast-2.amazonaws.com/"+fileName);
                return ResponseEntity.status(200).body("https://don-jo.s3.ap-northeast-2.amazonaws.com/"+fileName);
            }
}

