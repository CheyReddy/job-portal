package com.job_portal.service;


import com.job_portal.dto.JobDetailsResponse;

public interface JobDetailsService {
    JobDetailsResponse getJobDetails(Long jobId, Long userId);
}
