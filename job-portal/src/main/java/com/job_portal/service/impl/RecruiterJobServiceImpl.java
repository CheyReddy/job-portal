package com.job_portal.service.impl;

import com.job_portal.dto.JobResponse;
import com.job_portal.entity.Job;
import com.job_portal.entity.RecruiterProfile;
import com.job_portal.entity.User;
import com.job_portal.repo.JobRepository;
import com.job_portal.repo.RecruiterProfileRepository;
import com.job_portal.service.RecruiterJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecruiterJobServiceImpl implements RecruiterJobService {

    private final RecruiterProfileRepository recruiterProfileRepository;
    private final JobRepository jobRepository;

    @Override
    public Page<Job> getMyJobs(User recruiter, String search, Pageable pageable) {

        RecruiterProfile profile =
                recruiterProfileRepository
                        .findByUser(recruiter)
                        .orElseThrow(() -> new RuntimeException("Recruiter profile not found"));
        Page<Job> jobs = jobRepository
                .findByRecruiterProfileAndTitleContainingIgnoreCase(
                        profile,
                        search == null ? "" : search,
                        pageable
                );
        return jobs.map(job -> Job.builder()
                .id(job.getId())
                .title(job.getTitle())
                .jobType(job.getJobType())
                .recruiterProfile(job.getRecruiterProfile())
                .description(job.getDescription())
                .experience(job.getExperience())
                .location(job.getLocation())
                .salary(job.getSalary())
                .createdAt(job.getCreatedAt())
                .build()
        );
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
}
