package com.job_portal.service;

import com.job_portal.dto.JobSeekerProfileRequest;
import com.job_portal.dto.JobSeekerProfileResponse;
import com.job_portal.entity.JobSeekerProfile;
import com.job_portal.entity.User;

public interface JobSeekerProfileService {
    JobSeekerProfile getProfile(User jobseeker);
    JobSeekerProfileResponse createOrUpdateProfile(JobSeekerProfileRequest request);
    boolean isProfileCompleted(Long userId);
}
