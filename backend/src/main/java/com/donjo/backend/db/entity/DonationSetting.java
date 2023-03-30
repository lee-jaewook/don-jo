package com.donjo.backend.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 멤버 도네이션 세팅 엔티티
 */
@Entity
@Table(name = "donation_settings")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DonationSetting {
  // 맴버 지갑 주소
  @Id
  private String memberAddress;
  // 맴버와 매핑
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_address")
  @JsonIgnore
  private Member member;
  // 도네이션 개당 가격(기본값 1)
  @Column
  @Builder.Default
  private int pricePerDonation = 1;
  // 도네이션 이모지(기본값 쿠키 이모지)
  @Column(columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
  @Builder.Default
  private String donationEmoji = "\uD83C\uDF6A";
  // 도네이션 이름(기본값 쿠키)
  @Column
  @Builder.Default
  private String donationName = "Cookie";
  // 감사메세지(기본값 thanks)
  @Column
  @Builder.Default
  private String thankMsg = "thanks";

}
