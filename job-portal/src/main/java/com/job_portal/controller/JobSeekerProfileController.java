package com.job_portal.controller;

import com.job_portal.dto.JobSeekerProfileRequest;
import com.job_portal.dto.JobSeekerProfileResponse;
import com.job_portal.entity.JobSeekerProfile;
import com.job_portal.entity.User;
import com.job_portal.repo.JobSeekerProfileRepository;
import com.job_portal.service.JobSeekerProfileService;
import com.job_portal.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobseeker/profile")
@RequiredArgsConstructor
@PreAuthorize("hasRole('JOB_SEEKER')")
public class JobSeekerProfileController {

    private final JobSeekerProfileService jobSeekerProfileService;

    @PostMapping
    public JobSeekerProfileResponse saveProfile(@RequestBody JobSeekerProfileRequest request){
        return jobSeekerProfileService.createOrUpdateProfile(request);
    }

    @GetMapping("/completed")
    public boolean isProfileCompleted(){
        User user = SecurityUtil.getCurrentUser();
        return jobSeekerProfileService.isProfileCompleted(user.getId());
    }

    @GetMapping
    public JobSeekerProfile getMyProfile(@AuthenticationPrincipal User jobseeker){
        return jobSeekerProfileService.getProfile(jobseeker);
    }




}
