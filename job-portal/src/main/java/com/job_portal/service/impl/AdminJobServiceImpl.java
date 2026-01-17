package com.job_portal.service.impl;

import com.job_portal.dto.AdminJobResponse;
import com.job_portal.entity.Job;
import com.job_portal.repo.JobRepository;
import com.job_portal.service.AdminJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminJobServiceImpl implements AdminJobService {

    private final JobRepository jobRepository;

    @Override
    public Page<AdminJobResponse> getAllJobs(Pageable pageable) {
        return jobRepository.findAll(pageable)
                .map(job -> AdminJobResponse.builder()
                        .id(job.getId())
                        .title(job.getTitle())
                        .companyName(job.getRecruiterProfile().getCompanyName())
                        .active(job.getActive())
                        .createdAt(job.getCreatedAt())
                        .build());
    }

    @Override
    public void enableJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        job.setActive(true);
        jobRepository.save(job);
    }

    @Override
    public void disableJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        job.setActive(false);
        jobRepository.save(job);
    }

    @Override
    public Page<AdminJobResponse> getJobs(String keyword, Pageable pageable) {
        Page<Job> page = (keyword == null || keyword.isBlank())
                ? jobRepository.findAll(pageable)
                : jobRepository.searchJobs(keyword, pageable);

        return page.map(job -> AdminJobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .companyName(job.getRecruiterProfile().getCompanyName())
                .active(job.getActive())
                .createdAt(job.getCreatedAt())
                .build());
    }
}
