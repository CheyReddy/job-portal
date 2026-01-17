package com.job_portal.service;

import com.job_portal.dto.UserRequest;
import com.job_portal.dto.UserResponse;
import com.job_portal.entity.User;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest userRequest);
    void deleteUser(Long id);
    String getUserRole(String email);
    List<UserResponse> fetchAllUsers();
    User getUserByEmail(String email);
    void updateUserStatus(Long userId, boolean enabled);
}
