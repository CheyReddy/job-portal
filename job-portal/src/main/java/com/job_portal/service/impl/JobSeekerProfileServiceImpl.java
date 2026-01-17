package com.job_portal.service.impl;

import com.job_portal.dto.JobSeekerProfileRequest;
import com.job_portal.dto.JobSeekerProfileResponse;
import com.job_portal.entity.JobSeekerProfile;
import com.job_portal.entity.User;
import com.job_portal.repo.JobSeekerProfileRepository;
import com.job_portal.service.JobSeekerProfileService;
import com.job_portal.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class JobSeekerProfileServiceImpl implements JobSeekerProfileService {

    private final JobSeekerProfileRepository seekerProfileRepository;

    @Override
    public JobSeekerProfile getProfile(User jobseeker) {
        return seekerProfileRepository.findByUserId(jobseeker.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found"));
    }

    @Override
    public JobSeekerProfileResponse createOrUpdateProfile(JobSeekerProfileRequest request) {
        User user = SecurityUtil.getCurrentUser();
        JobSeekerProfile profile = seekerProfileRepository.findByUserId(user.getId())
                .orElse( new JobSeekerProfile());
        profile.setFullName(request.getFullName());
        profile.setPhone(request.getPhone());
        profile.setLocation(request.getLocation());
        profile.setEducation(request.getEducation());
        profile.setSkills(request.getSkills());
        profile.setExperience(request.getExperience());
        profile.setResumeUrl(request.getResumeUrl());
        profile.setUser(user);
        JobSeekerProfile saved = seekerProfileRepository.save(profile);
        return convertToResponse(saved);
    }

    private JobSeekerProfileResponse convertToResponse(JobSeekerProfile p) {
        return JobSeekerProfileResponse.builder()
                .fullName(p.getFullName())
                .phone(p.getPhone())
                .location(p.getLocation())
                .skills(p.getSkills())
                .experience(p.getExperience())
                .education(p.getEducation())
                .resumeUrl(p.getResumeUrl())
                .build();
    }

    @Override
    public boolean isProfileCompleted(Long userId) {
        return false;
    }
}
