package com.job_portal.service;

import com.job_portal.dto.AuthRequest;
import com.job_portal.dto.AuthResponse;

public interface AuthService {
    AuthResponse processLogin(AuthRequest request) throws Exception;
}
