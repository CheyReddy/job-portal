package com.job_portal.controller;

import com.job_portal.dto.JobSeekerDashboardResponse;
import com.job_portal.entity.User;
import com.job_portal.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jobseeker/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('JOB_SEEKER')")
public class JobSeekerDashboardController {
    private final JobService jobService;

    @GetMapping
    public JobSeekerDashboardResponse getDashboard(
            @AuthenticationPrincipal User user) {
        return jobService.getDashboard(user.getId());
    }
}
