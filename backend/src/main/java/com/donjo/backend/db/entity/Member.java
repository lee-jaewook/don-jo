package com.donjo.backend.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
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
   @GeneratedValue(strategy = GenerationType.AUTO)
   private String address;

   @Column(name = "nickname", length = 10)
   @NotNull
   private String nickname;

   @ManyToMany
   @JoinTable(
      name = "user_authority_join",
      joinColumns = {@JoinColumn(name = "member_address", referencedColumnName = "address")},
   inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
   private Set<Authority> authorities;
}
