package com.donjo.backend.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.annotation.Nullable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * 사용자 엔티티
 */
@Entity
@Table(name = "members")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@ToString
public class Member {
   // 맴버 주소(지갑 주소)
   @Id
   @Column(name = "address")
   private String address;
   // 이미지 경로
   @Column(length = 300)
   @Nullable
   private String profileImagePath;
   // 배경 이미지 경로
   @Column(length = 300)
   @Nullable
   private String backgroundImgPath;
   // 닉네임
   @Column(length = 10)
   @NotNull
   private String nickname;
   // 소개글
   @Column
   @Nullable
   private String introduction;
   // 후원자 수
   @Column
   @NotNull
   private int numSupporters;
   // 개인페이지 이름
   @Column(length = 30)
   @NotNull
   private String pageName;
   // 개인 비밀번호
   @Column(name = "password")
   @NotNull
   private String password;
   // 리프레쉬 토큰
   @Column(length = 300)
   @Nullable
   private String refreshToken;
   // 테마 색깔(기본값 0)
   @Column(length = 1)
   @Builder.Default
   private int themeColor = 0;
   // 소셜 리스트(3개)
   @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
   @JoinColumn(name = "member_address", referencedColumnName = "address")
   private List<Social> social;
   // 도네이션 셋팅
   @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
   private DonationSetting donationSetting;
   // 권한 부여
   @ManyToMany
   @JoinTable(
      name = "user_authority_join",
      joinColumns = {@JoinColumn(name = "member_address", referencedColumnName = "address")},
   inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
   private Set<Authority> authorities;


   public Member(String address){
      this.address = address;
   }

}
