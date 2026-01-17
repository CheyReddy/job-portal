package com.job_portal.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobSeekerDashboardResponse {
    private long applied;
    private long shortlisted;
    private long rejected;
    private long hired;
    private int profileCompletion;
}
