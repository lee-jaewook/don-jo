package com.donjo.backend.db.entity;


/**
 * 멤버 소셜 엔티티
 */
import javax.annotation.Nullable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.*;

@Entity
@Table(name = "socials")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Social {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  @Nullable
  private String socialLink;
}
