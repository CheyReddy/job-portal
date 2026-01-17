package com.job_portal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private String name;
    private String email;
    private String password;
    private String role;
    private Boolean enabled;
    private LocalDateTime createdAt;
}
