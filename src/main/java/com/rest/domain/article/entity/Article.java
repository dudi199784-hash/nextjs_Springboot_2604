package com.rest.domain.article.entity;

import com.rest.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Article extends BaseEntity {
    private String subject;
    private String content;
}
