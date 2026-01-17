package com.job_portal.service;

import com.job_portal.dto.JobSeekerApplicationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface JobSeekerApplicationService {
    Page<JobSeekerApplicationResponse> getMyApplications(Pageable pageable);
}
