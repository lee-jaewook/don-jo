package com.donjo.backend.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
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
@ToString
public class DonationSetting {

  @Id
  private String memberAddress;

  @OneToOne(fetch = FetchType.LAZY)
  @MapsId
  @JoinColumn(name = "member_address", referencedColumnName = "address")
  private Member member;

  @Column
  @Builder.Default
  private int pricePerDonation = 1;

  @Column(columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
  @Builder.Default
  private String donationEmoji = "\uD83C\uDF6A";

  @Column
  @Builder.Default
  private String donationName = "Cookie";

  @Column
  @Builder.Default
  private String thankMsg = "thanks";

}
