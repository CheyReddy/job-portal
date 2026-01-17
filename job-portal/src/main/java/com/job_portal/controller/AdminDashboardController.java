package com.job_portal.controller;

import com.job_portal.dto.AdminStatsResponse;
import com.job_portal.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {
    private final AdminDashboardService adminDashboardService;

    @GetMapping("/stats")
    public AdminStatsResponse getStats() {
        return adminDashboardService.getDashboardStats();
    }
}
