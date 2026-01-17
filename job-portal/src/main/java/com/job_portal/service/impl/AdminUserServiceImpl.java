package com.job_portal.service.impl;

import com.job_portal.dto.AdminUserResponse;
import com.job_portal.dto.UserResponse;
import com.job_portal.entity.User;
import com.job_portal.repo.UserRepository;
import com.job_portal.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;

    @Override
    public Page<AdminUserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(user -> AdminUserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .enabled(user.getEnabled())
                        .createdAt(user.getCreatedAt())
                        .build()
                );
    }

    @Override
    public void enableUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Override
    public void disableUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(false);
        userRepository.save(user);
    }

    @Override
    public Page<AdminUserResponse> getUsers(String keyword, Pageable pageable) {
        Page<User> users = (keyword == null || keyword.isBlank())
                ?userRepository.findAll(pageable)
                :userRepository.findByEmailContainingIgnoreCase(keyword, pageable);
        return users.map(user -> AdminUserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .enabled(user.getEnabled())
                .createdAt(user.getCreatedAt())
                .build()
        );

    }
}
