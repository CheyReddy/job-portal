package com.job_portal.service.impl;

import com.job_portal.dto.JobDetailsResponse;
import com.job_portal.dto.JobRequest;
import com.job_portal.dto.JobResponse;
import com.job_portal.dto.JobSeekerDashboardResponse;
import com.job_portal.entity.ApplicationStatus;
import com.job_portal.entity.Job;
import com.job_portal.entity.RecruiterProfile;
import com.job_portal.entity.User;
import com.job_portal.repo.*;
import com.job_portal.service.JobService;
import com.job_portal.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final JobSeekerProfileRepository jobSeekerProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final ApplicationRepository applicationRepository;

    @Override
    public JobResponse createJob(JobRequest request, User recruiter) {
        User user = SecurityUtil.getCurrentUser();
        if (!recruiterProfileRepository.existsByUserId(user.getId())) {
            throw new AccessDeniedException("Complete profile first");
        }

        RecruiterProfile profile = recruiterProfileRepository
                .findByUserId(user.getId())
                .orElseThrow(() ->
                        new AccessDeniedException("Recruiter profile not found"));

        if (!profile.getApproved()) {
            throw new AccessDeniedException(
                    "Recruiter profile is not approved by admin"
            );
        }

        Job newJob = convertToEntity(request, profile);
        newJob = jobRepository.save(newJob);
        return convertToResponse(newJob);
    }

    @Override
    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public JobSeekerDashboardResponse getDashboard(Long userId) {
        long applied = applicationRepository.countByApplicantId(userId);
        long shortlisted = applicationRepository.countByApplicantIdAndStatus(userId, ApplicationStatus.SHORTLISTED);
        long rejected = applicationRepository.countByApplicantIdAndStatus(userId, ApplicationStatus.REJECTED);
        long hired = applicationRepository.countByApplicantIdAndStatus(userId, ApplicationStatus.HIRED);
        int profileCompletion = calculateProfileCompletion(userId);

        return JobSeekerDashboardResponse.builder()
                .applied(applied)
                .shortlisted(shortlisted)
                .rejected(rejected)
                .hired(hired)
                .profileCompletion(profileCompletion)
                .build();
    }

    @Override
    public int calculateProfileCompletion(Long userId) {
        return jobSeekerProfileRepository.findByUserId(userId)
                .map(profile -> {
                    int completed = 0;
                    int total = 4;
                    if (profile.getSkills() != null) completed++;
                    if (profile.getEducation() != null) completed++;
                    if (profile.getExperience() != null) completed++;
                    if (profile.getResumeUrl() != null) completed++;

                    return (completed * 100) / total;
                })
                .orElse(0);
    }

    @Override
    public Page<JobDetailsResponse> getJobsForJobSeeker(User recruiter, String search, Pageable pageable) {
        Page<Job> jobs = jobRepository.searchJobs(search, pageable);
        return jobs.map(job -> JobDetailsResponse.builder()
                .jobId(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .experience(job.getExperience())
                .location(job.getLocation())
                .salary(job.getSalary())
                .jobType(job.getJobType())
                .companyName(job.getRecruiterProfile().getCompanyName())
                .recruiterName(job.getRecruiterProfile().getUser().getName())
                .enabled(job.getActive())
                .build());
    }

    @Override
    public JobDetailsResponse getJobDetails(Long jobId, Long userId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found"));

        boolean applied = applicationRepository.existsByJobIdAndApplicantId(jobId, userId);

        return JobDetailsResponse.builder()
                .jobId(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .companyWebsite(job.getRecruiterProfile().getCompanyWebsite())
                .companyName(job.getRecruiterProfile().getCompanyName())
                .location(job.getLocation())
                .experience(job.getExperience())
                .salary(job.getSalary())
                .jobType(job.getJobType())
                .applied(applied)
                .enabled(job.getActive())
                .build();
    }

    private JobResponse convertToResponse(Job job) {
        return JobResponse.builder()
                .jobId(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .experience(job.getExperience())
                .location(job.getLocation())
                .salary(job.getSalary())
                .jobType(job.getJobType())
                .recruiterName(job.getRecruiterProfile().getUser().getName())
                .companyName(job.getRecruiterProfile().getCompanyName())
                .createdAt(job.getCreatedAt())
                .build();
    }

    private Job convertToEntity(JobRequest req, RecruiterProfile profile) {
        return Job.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .experience(req.getExperience())
                .location(req.getLocation())
                .salary(req.getSalary())
                .jobType(req.getJobType())
                .recruiterProfile(profile)
                .build();
    }

}
