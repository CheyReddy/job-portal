package com.job_portal.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class AdminStatsResponse {
    private long totalUsers;
    private long totalRecruiters;
    private long pendingRecruiters;
    private long totalJobs;
    private Map<String, Long> jobsPerMonth;
}
