package controller;

import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.donjo.backend.api.controller.MemberController;
import com.donjo.backend.api.service.member.MemberServiceImpl;
import com.donjo.backend.exception.DuplicateMemberException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@WebMvcTest(controllers = MemberController.class, excludeAutoConfiguration = {
    SecurityAutoConfiguration.class})
class MemberControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private MemberServiceImpl memberService;

  @Test
  @DisplayName("GET /members/{member_address} - Success")
  void testCheckExistingMemberSuccess() throws Exception {
    String memberAddress = "qwer";

    mockMvc.perform(
        MockMvcRequestBuilders.get("/members/{member_address}", memberAddress))
        .andExpect(status().isNoContent());
  }

  @Test
  @DisplayName("GET /members/{member_address} - Conflict")
  public void testCheckExistingMemberConflict() throws Exception {
    String memberAddress = "asdfq";

    mockMvc.perform(MockMvcRequestBuilders.get("/members/{member_address}", memberAddress))
        .andExpect(status().isOk());
  }
}