package com.job_portal.service.impl;

import com.job_portal.dto.RecruiterProfileResponse;
import com.job_portal.entity.RecruiterProfile;
import com.job_portal.repo.RecruiterProfileRepository;
import com.job_portal.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final RecruiterProfileRepository recruiterProfileRepository;

    @Override
    public List<RecruiterProfileResponse> getPendingRecruiters() {
        return recruiterProfileRepository.findByApprovedFalse()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private RecruiterProfileResponse convertToResponse(RecruiterProfile profile) {
        return RecruiterProfileResponse.builder()
                .id(profile.getId())
                .companyName(profile.getCompanyName())
                .companyWebsite(profile.getCompanyWebsite())
                .companyLocation(profile.getCompanyLocation())
                .industryType(profile.getIndustryType())
                .approved(profile.getApproved())
                .build();
    }

    @Override
    public void approveRecruiter(Long profileId) {
        RecruiterProfile profile = recruiterProfileRepository
                .findById(profileId)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter profile not found"));

        profile.setApproved(true);
        recruiterProfileRepository.save(profile);
    }

    @Override
    public void rejectRecruiter(Long profileId) {
        RecruiterProfile profile = recruiterProfileRepository
                .findById(profileId)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter profile not found"));

        recruiterProfileRepository.delete(profile);
    }
}
