package com.job_portal.service;

import com.job_portal.dto.AdminUserResponse;
import com.job_portal.dto.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminUserService {

    Page<AdminUserResponse> getAllUsers(Pageable pageable);
    void enableUser(Long userId);
    void disableUser(Long userId);
    Page<AdminUserResponse> getUsers(String keyword, Pageable pageable);
}
