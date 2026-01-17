package com.job_portal.service;

import com.job_portal.dto.RecruiterApplicantResponse;
import com.job_portal.entity.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RecruiterApplicationService {
    Page<RecruiterApplicantResponse> getApplicants(Long jobId, Pageable pageable);
    void updateStatus(Long applicationId, ApplicationStatus status);
}
