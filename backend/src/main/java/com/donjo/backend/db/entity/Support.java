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
    @Id
    @Column(name = "support_id")
    private String transactionHash ;

    @Column
    private String supportType;

    @Column
    private Long supportTypeUid;

    @Column
    private Long supportUid;


    @Column
    private String fromAddress;

    @Column
    private String toAddress;

    @Column
    private String sendMsg;

    @Column
    private String replyMsg;

    @Column
    private LocalDateTime sendTimeStamp;

    @Column
    private LocalDateTime arriveTimeStamp;

    @Column
    private Long amount; // wei
}
