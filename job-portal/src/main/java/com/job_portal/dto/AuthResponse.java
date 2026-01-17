package com.job_portal.dto;

import com.job_portal.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String email;
    private String role;
    private String token;
    private long expiresIn;
    private boolean profileCompleted;
}
