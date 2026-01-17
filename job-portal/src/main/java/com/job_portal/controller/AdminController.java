package com.job_portal.controller;

import com.job_portal.dto.RecruiterProfileResponse;
import com.job_portal.dto.UserResponse;
import com.job_portal.entity.RecruiterProfile;
import com.job_portal.service.AdminService;
import com.job_portal.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/recruiters/pending")
    public List<RecruiterProfileResponse> getPendingRecruiters() {
        return adminService.getPendingRecruiters();
    }

    @PutMapping("/recruiters/{id}/approve")
    public void approveRecruiter(@PathVariable Long id) {
        adminService.approveRecruiter(id);
    }

    @DeleteMapping("/recruiters/{id}/reject")
    public void rejectRecruiter(@PathVariable Long id) {
        adminService.rejectRecruiter(id);
    }
}
