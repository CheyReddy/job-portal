package com.job_portal.controller;

import com.job_portal.dto.JobDetailsResponse;
import com.job_portal.dto.JobResponse;
import com.job_portal.entity.Job;
import com.job_portal.entity.User;
import com.job_portal.service.ApplicationService;
import com.job_portal.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobseeker/jobs")
@RequiredArgsConstructor
@PreAuthorize("hasRole('JOB_SEEKER')")
public class JobSeekerJobController {
    private final JobService jobService;
    private final ApplicationService applicationService;

    @GetMapping
    public Page<JobDetailsResponse> getMyJobs(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal User jobseeker
    ) {
        Pageable pageable = PageRequest.of(page,size, Sort.by("createdAt").descending());
        return jobService.getJobsForJobSeeker( jobseeker,search,pageable);
    }

    @GetMapping("/{id}")
    public JobDetailsResponse getJob(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {

        return jobService.getJobDetails(id, user.getId());
    }

    @PostMapping("/{jobId}/apply")
    public void applyJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal User user) {

        applicationService.apply(jobId, user.getId());
    }

}
