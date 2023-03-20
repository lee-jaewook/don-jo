package com.donjo.backend.api.dto.item.request;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddItemCond {
    @NotNull
    @Size(min = 2)
    private String title;

    @NotNull
    private String imgPath;

    private String description;

    @NotNull
    private double price;

    private String message;

    @NotNull
    private String filePath;
}
