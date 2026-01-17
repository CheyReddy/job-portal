package com.job_portal.service.impl;

import com.job_portal.entity.*;
import com.job_portal.repo.ApplicationRepository;
import com.job_portal.repo.JobRepository;
import com.job_portal.repo.JobSeekerProfileRepository;
import com.job_portal.repo.UserRepository;
import com.job_portal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final JobSeekerProfileRepository jobSeekerProfileRepository;

    @Override
    public void apply(Long jobId, Long userId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        JobSeekerProfile profile = jobSeekerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Complete jobseeker profile first"));


        if(applicationRepository.existsByJobIdAndApplicantId(jobId,userId)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have already applied for this job");
        }

        if (profile.getResumeUrl() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Upload resume before applying");
        }

        Application application = Application.builder()
                .job(job)
                .applicant(user)
                .resumeUrl(profile.getResumeUrl())
                .status(ApplicationStatus.APPLIED)
                .build();
        applicationRepository.save(application);
    }

}
