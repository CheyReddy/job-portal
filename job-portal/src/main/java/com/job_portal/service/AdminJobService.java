package com.job_portal.service;

import com.job_portal.dto.AdminJobResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminJobService {
    Page<AdminJobResponse> getAllJobs(Pageable pageable);
    void enableJob(Long jobId);
    void disableJob(Long jobId);
    Page<AdminJobResponse> getJobs(String keyword, Pageable pageable);
}
