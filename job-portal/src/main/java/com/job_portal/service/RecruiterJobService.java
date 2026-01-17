package com.job_portal.service;

import com.job_portal.dto.JobResponse;
import com.job_portal.entity.Job;
import com.job_portal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RecruiterJobService {
    Page<Job> getMyJobs(User recruiter, String search, Pageable pageable);
    void enableJob(Long jobId);
    void disableJob(Long jobId);
}
