package com.donjo.backend.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.donjo.backend.api.service.s3.S3Uploader;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Api(tags = "파일 관련 기능 API")
@RequestMapping("/api/file")
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
                                              @RequestPart MultipartFile multipartFile){
            // category 변수가 list에 포함되어 있지 않으면 400에러 반환
            List<String> list = new ArrayList<>(Arrays.asList(new String[]{"img/profile", "img/background", "img/item", "img/wishlist", "item","img/plugin"}));
            if(!list.contains(category)) return ResponseEntity.status(400).build();

            // S3에 파일 업로드  return 값으로 fileName return 받음
            String fileName;
            try {
                fileName = s3Upload.uploadFile(multipartFile,category);
                return ResponseEntity.status(200).body(fileName);
            } catch (IOException e) {
                return ResponseEntity.status(400).body("요청실패");
            }
        }
}

