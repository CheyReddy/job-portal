package com.job_portal.service.impl;

import com.job_portal.dto.JobDetailsResponse;
import com.job_portal.entity.Job;
import com.job_portal.repo.ApplicationRepository;
import com.job_portal.repo.JobRepository;
import com.job_portal.service.JobDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobDetailsServiceImpl implements JobDetailsService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    @Override
    public JobDetailsResponse getJobDetails(Long jobId, Long userId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        boolean applied = applicationRepository
                .existsByJobIdAndApplicantId(jobId,userId);

        return JobDetailsResponse.builder()
                .jobId(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .salary(job.getSalary())
                .jobType(job.getJobType())
                .companyName(job.getRecruiterProfile().getCompanyName())
                .companyWebsite(job.getRecruiterProfile().getCompanyWebsite())
                .recruiterName(job.getRecruiterProfile().getUser().getName())
                .location(job.getLocation())
                .experience(job.getExperience())
                .enabled(job.getActive())
                .applied(applied)
                .build();
    }
}
