package com.donjo.backend.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.List;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.annotation.Nullable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Support {
    // 트랜잭션 해쉬
    @Id
    @Column(name = "support_id")
    private String transactionHash ;
    // 서포트 종류(donation,item,wishlist)
    @Column
    private String supportType;
    // 서포트 종류 Uid
    @Column
    private Long supportTypeUid;
    // 서포트 Uid
    @Column
    private Long supportUid;
    // 보내는 사람
    @Column
    private String fromAddress;
    // 받는 사람
    @Column
    private String toAddress;
    // 감사 메시지
    @Column
    private String sendMsg;
    // 댓글
    @Column
    private String replyMsg;
    // 보낸 시간
    @Column
    private LocalDateTime sendTimeStamp;
    // 도착 시간
    @Column
    private LocalDateTime arriveTimeStamp;
    // 후원 금액
    @Column(precision = 13, scale = 6)
    private Double amount; // ether
}
