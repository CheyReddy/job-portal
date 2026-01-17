package com.job_portal.controller;

import com.job_portal.dto.RecruiterProfileRequest;
import com.job_portal.dto.RecruiterProfileResponse;
import com.job_portal.entity.RecruiterProfile;
import com.job_portal.entity.User;
import com.job_portal.service.RecruiterProfileService;
import com.job_portal.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiter/profile")
@RequiredArgsConstructor
@PreAuthorize("hasRole('RECRUITER')")
public class RecruiterProfileController {
    private final RecruiterProfileService recruiterProfileService;

    @PostMapping
    public RecruiterProfileResponse saveProfile(@RequestBody RecruiterProfileRequest request){
        return recruiterProfileService.createOrUpdateProfile(request);
    }

    @GetMapping("/completed")
    public boolean isProfileCompleted(){
        User user = SecurityUtil.getCurrentUser();
        return recruiterProfileService.isProfileCompleted(user.getId());
    }

    @GetMapping
    public RecruiterProfile getMyProfile(
            @AuthenticationPrincipal User recruiter) {
        return recruiterProfileService.getProfile(recruiter);
    }

}
