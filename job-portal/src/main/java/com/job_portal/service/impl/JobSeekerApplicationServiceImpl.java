package com.job_portal.service.impl;

import com.job_portal.dto.JobSeekerApplicationResponse;
import com.job_portal.entity.User;
import com.job_portal.repo.ApplicationRepository;
import com.job_portal.service.JobSeekerApplicationService;
import com.job_portal.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobSeekerApplicationServiceImpl implements JobSeekerApplicationService {

    private final ApplicationRepository applicationRepository;

    @Override
    public Page<JobSeekerApplicationResponse> getMyApplications(Pageable pageable) {
        User user = SecurityUtil.getCurrentUser();
        return applicationRepository.findByApplicantId(user.getId(), pageable)
                .map(app -> JobSeekerApplicationResponse.builder()
                        .applicationId(app.getId())
                        .jobId(app.getJob().getId())
                        .jobTitle(app.getJob().getTitle())
                        .companyName(app.getJob().getRecruiterProfile().getCompanyName())
                        .location(app.getJob().getLocation())
                        .experience(app.getJob().getExperience())
                        .status(app.getStatus())
                        .appliedAt(app.getAppliedAt())
                        .build());

    }
}
