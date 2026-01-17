package com.job_portal.service;

import com.job_portal.dto.ApplicationRequest;
import com.job_portal.dto.ApplicationResponse;
import com.job_portal.entity.ApplicationStatus;
import com.job_portal.entity.User;

import java.util.List;

public interface ApplicationService {

    void apply(Long jobId, Long userId);
}
