package com.job_portal.controller;

import com.job_portal.dto.RecruiterApplicantResponse;
import com.job_portal.entity.ApplicationStatus;
import com.job_portal.entity.Job;
import com.job_portal.entity.User;
import com.job_portal.service.RecruiterApplicationService;
import com.job_portal.service.RecruiterJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiter")
@RequiredArgsConstructor
@PreAuthorize("hasRole('RECRUITER')")
public class RecruiterController {

    private final RecruiterJobService recruiterJobService;
    private final RecruiterApplicationService applicationService;

    @GetMapping("/jobs")
    public Page<Job> getMyJobs(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal User recruiter
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return recruiterJobService.getMyJobs(recruiter, search, pageable);
    }

    @PatchMapping("/jobs/{id}/enable")
    public void enableJob(@PathVariable Long id) {
        recruiterJobService.enableJob(id);
    }

    @PatchMapping("/jobs/{id}/disable")
    public void disableJob(@PathVariable Long id) {
        recruiterJobService.disableJob(id);
    }

    @GetMapping("/jobs/{jobId}/applicants")
    public Page<RecruiterApplicantResponse> getApplicants(
            @PathVariable Long jobId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("appliedAt").descending());
        return applicationService.getApplicants(jobId, pageable);
    }

    @PutMapping("/applicants/{id}/status")
    public void updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status
    ) {
        applicationService.updateStatus(id, status);
    }
}
