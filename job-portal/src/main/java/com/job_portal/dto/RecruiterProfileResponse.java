package com.job_portal.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecruiterProfileResponse {
    private Long id;
    private String companyName;
    private String companyWebsite;
    private String companyLocation;
    private String industryType;
    private Boolean approved;
}
