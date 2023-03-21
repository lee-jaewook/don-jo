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
@ToString(exclude = "DonationSetting")
public class Support {
    @Id
    @Column(name = "support_id")
    private String transactionHash ;

    @Column
    private String supportType;

    @Column
    private Integer supportUid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_address", referencedColumnName = "address")
    private Member fromAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_address", referencedColumnName = "address")
    private Member toAddress;


    @Column
    private String sendMsg;

    @Column
    private LocalDateTime sendTimeStamp;

    @Column
    @Nullable
    private LocalDateTime arriveTimeStamp;

    @Column
    private Double amountEth;
}
