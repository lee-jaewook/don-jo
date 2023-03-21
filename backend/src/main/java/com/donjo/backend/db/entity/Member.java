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
public class Member {
   @Id
   @Column(name = "address")
   private String address;

   @Column(length = 300)
   @Nullable
   private String profileImagePath;

   @Column(length = 300)
   @Nullable
   private String backgroundImgPath;

   @Column(length = 10)
   @NotNull
   private String nickname;

   @Column
   @Nullable
   private String introduction;

   @Column
   @NotNull
   private int numSupporters;

   @Column(length = 30)
   @NotNull
   private String pageName;

   @Column(name = "password")
   @NotNull
   private String password;

   @Column(length = 300)
   @Nullable
   private String refreshToken;

   @Column(length = 1)
   @Builder.Default
   private int themeColor = 1;

   @OneToMany
   private List<Social> social;

   @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
   @JsonIgnore
   private DonationSetting donationSetting;

   @ManyToMany
   @JoinTable(
      name = "user_authority_join",
      joinColumns = {@JoinColumn(name = "member_address", referencedColumnName = "address")},
   inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
   private Set<Authority> authorities;

}
