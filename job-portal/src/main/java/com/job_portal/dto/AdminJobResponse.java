package com.job_portal.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AdminJobResponse {
    private Long id;
    private String title;
    private String companyName;
    private Boolean active;
    private LocalDateTime createdAt;
}
