package com.job_portal.service.impl;

import com.job_portal.dto.RecruiterProfileRequest;
import com.job_portal.dto.RecruiterProfileResponse;
import com.job_portal.entity.RecruiterProfile;
import com.job_portal.entity.User;
import com.job_portal.repo.RecruiterProfileRepository;
import com.job_portal.repo.UserRepository;
import com.job_portal.service.RecruiterProfileService;
import com.job_portal.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class RecruiterProfileServiceImpl implements RecruiterProfileService {

    private final RecruiterProfileRepository repository;


    @Override
    public RecruiterProfileResponse createOrUpdateProfile(RecruiterProfileRequest request) {
        User user = SecurityUtil.getCurrentUser();
        RecruiterProfile profile = repository.findByUserId(user.getId())
                .orElse(new RecruiterProfile());
        profile.setCompanyName(request.getCompanyName());
        profile.setCompanyWebsite(request.getCompanyWebsite());
        profile.setCompanyLocation(request.getCompanyLocation());
        profile.setIndustryType(request.getIndustryType());
        profile.setApproved(false);
        profile.setUser(user);

        RecruiterProfile saved = repository.save(profile);

        return convertToResponse(saved);
    }

    private RecruiterProfileResponse convertToResponse(RecruiterProfile saved) {
        return RecruiterProfileResponse.builder()
                .id(saved.getId())
                .companyName(saved.getCompanyName())
                .companyWebsite(saved.getCompanyWebsite())
                .companyLocation(saved.getCompanyLocation())
                .industryType(saved.getIndustryType())
                .approved(saved.getApproved())
                .build();
    }

    @Override
    public boolean isProfileCompleted(Long userId) {
        return false;
    }

    @Override
    public RecruiterProfile getProfile(User recruiter) {
        return repository.findByUser(recruiter)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Profile not found"));
    }
}
