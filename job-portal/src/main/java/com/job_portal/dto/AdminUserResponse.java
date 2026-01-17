package com.job_portal.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AdminUserResponse {
    private Long id;
    private String email;
    private String role;
    private Boolean enabled;
    private LocalDateTime createdAt;
}
