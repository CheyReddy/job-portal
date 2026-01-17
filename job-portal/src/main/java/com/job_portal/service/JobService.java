package com.job_portal.service;

import com.job_portal.dto.JobDetailsResponse;
import com.job_portal.dto.JobRequest;
import com.job_portal.dto.JobResponse;
import com.job_portal.dto.JobSeekerDashboardResponse;
import com.job_portal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface JobService {
    JobResponse createJob(JobRequest request, User recruiter);

    List<JobResponse> getAllJobs();

    JobSeekerDashboardResponse getDashboard(Long userId);

    int calculateProfileCompletion(Long userId);

    Page<JobDetailsResponse> getJobsForJobSeeker(User recruiter, String search, Pageable pageable);

    JobDetailsResponse getJobDetails(Long jobId, Long userId);
}
