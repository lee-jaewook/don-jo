package com.donjo.backend.api.controller;

import com.donjo.backend.api.dto.support.DonationDto;
import com.donjo.backend.api.service.support.SupportServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = SupportController.class, excludeAutoConfiguration = {
        SecurityAutoConfiguration.class})
class SupportControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private SupportServiceImpl supportService;

    @Test
    @DisplayName("안녕")
    void getEarning() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/auth/member/dashboard/earning").param("type", "item").param("period", "30")).andExpect(status().isOk());
    }

    @Test
    void getSupports() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/auth/member/dashboard/supports").param("type", "item").param("page_num", "1")).andExpect(status().isOk());

    }

    @Test
    void getSupportDetail() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/member/supports").param("type", "item").param("supportUid", "1")).andExpect(status().isOk());

    }

    @Test
    void getSupportCount() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/member/supporters/count").param("type", "item")).andExpect(status().isOk());
    }

    @Test
    void getDonationSetting() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/auth/member/donation/setting")).andExpect(status().isOk());

    }

    @Test
    void changeDonationSetting() throws Exception {
        DonationDto donationDto = new DonationDto();
        donationDto.setDonationEmoji("슬픔");
        donationDto.setDonationName("쿠키");
        donationDto.setPricePerDonation(1);
        donationDto.setThankMsg("감사합니다!!");
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/auth/member/donation/setting").content(objectMapper.writeValueAsString(donationDto)).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

    }

    @Test
    void getQrcode() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/auth/member/qrcode")).andExpect(status().isOk());

    }
}