package com.job_portal.service;

import com.job_portal.dto.RecruiterProfileResponse;

import java.util.List;

public interface AdminService {
    List<RecruiterProfileResponse> getPendingRecruiters();

    void approveRecruiter(Long profileId);

    void rejectRecruiter(Long profileId);
}
