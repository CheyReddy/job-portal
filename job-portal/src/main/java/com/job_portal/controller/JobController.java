package com.job_portal.controller;

import com.job_portal.dto.JobRequest;
import com.job_portal.dto.JobResponse;
import com.job_portal.entity.User;
import com.job_portal.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @Operation(
            summary = "Post new job"
    )
    @PostMapping("/job")
    @ResponseStatus(HttpStatus.CREATED)
    public JobResponse postJob(@RequestBody @Valid JobRequest request, @AuthenticationPrincipal User recruiter) {
        try {
            return jobService.createJob(request, recruiter);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to create job" + e.getMessage());
        }
    }

    @Operation(
            summary = "Fetch jobs"
    )
    @GetMapping("/jobs")
    @ResponseStatus(HttpStatus.OK)
    public List<JobResponse> fetchAllJobs() {
        try {
            return jobService.getAllJobs();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to fetch jobs" + e.getMessage());
        }
    }

    @Operation(
            summary = "Delete Job"
    )
    @DeleteMapping("/jobs/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteJob(@PathVariable Long id, User recruiter) {

    }

}
