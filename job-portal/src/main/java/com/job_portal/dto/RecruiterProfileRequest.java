package com.job_portal.dto;

import lombok.Data;

@Data
public class RecruiterProfileRequest {
    private String companyName;
    private String companyWebsite;
    private String companyLocation;
    private String industryType;
}
