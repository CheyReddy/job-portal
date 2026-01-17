package com.job_portal.controller;

import com.job_portal.dto.AdminUserResponse;
import com.job_portal.dto.UserResponse;
import com.job_portal.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {
    private final AdminUserService adminUserService;

    @PutMapping("/{id}/enable")
    public void enableUser(@PathVariable Long id) {
        adminUserService.enableUser(id);
    }

    @PutMapping("/{id}/disable")
    public void disableUser(@PathVariable Long id) {
        adminUserService.disableUser(id);
    }

    @GetMapping
    public Page<AdminUserResponse> getUsers(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return adminUserService.getUsers(search,PageRequest.of(page,size, Sort.by("createdAt").descending()));
    }
}
