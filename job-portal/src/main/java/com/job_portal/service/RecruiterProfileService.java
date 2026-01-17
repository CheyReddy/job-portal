package com.job_portal.service;

import com.job_portal.dto.RecruiterProfileRequest;
import com.job_portal.dto.RecruiterProfileResponse;
import com.job_portal.entity.RecruiterProfile;
import com.job_portal.entity.User;

public interface RecruiterProfileService {
    RecruiterProfileResponse createOrUpdateProfile(RecruiterProfileRequest request);
    boolean isProfileCompleted(Long userId);
    RecruiterProfile getProfile(User recruiter);
}
