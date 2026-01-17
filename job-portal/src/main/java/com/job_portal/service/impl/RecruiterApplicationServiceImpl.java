package com.job_portal.service.impl;

import com.job_portal.dto.RecruiterApplicantResponse;
import com.job_portal.entity.Application;
import com.job_portal.entity.ApplicationStatus;
import com.job_portal.entity.Job;
import com.job_portal.entity.User;
import com.job_portal.repo.ApplicationRepository;
import com.job_portal.repo.JobRepository;
import com.job_portal.service.RecruiterApplicationService;
import com.job_portal.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;

@Service
@RequiredArgsConstructor
public class RecruiterApplicationServiceImpl implements RecruiterApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    @Override
    public Page<RecruiterApplicantResponse> getApplicants(Long jobId, Pageable pageable) {
        User user = SecurityUtil.getCurrentUser();
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        if(!job.getRecruiterProfile().getId().equals(user.getId())){
            try {
                throw new AccessDeniedException("Not authorized");
            } catch (AccessDeniedException e) {
                throw new RuntimeException(e);
            }
        }
        return applicationRepository.findByJobId(jobId,pageable)
                .map(app -> RecruiterApplicantResponse.builder()
                        .applicationId(app.getId())
                        .jobId(jobId)
                        .jobTitle(job.getTitle())
                        .applicantId(app.getApplicant().getId())
                        .applicantName(app.getApplicant().getName())
                        .applicantEmail(app.getApplicant().getEmail())
                        .resumeUrl(app.getResumeUrl())
                        .status(app.getStatus())
                        .appliedAt(app.getAppliedAt())
                        .build());
    }

    @Override
    public void updateStatus(Long applicationId, ApplicationStatus status) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        applicationRepository.save(app);
    }
}
