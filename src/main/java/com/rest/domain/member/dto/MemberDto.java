package com.rest.domain.member.dto;

import com.rest.domain.member.entity.Member;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String username;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public MemberDto(Member member) {
        this.id = member.getId();
        this.username = member.getUsername();
        this.createdDate = member.getCreateDate();
        this.modifiedDate = member.getModifyDate();
    }
}
