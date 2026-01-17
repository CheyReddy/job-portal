package com.job_portal.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobSeekerProfileResponse {
    private String fullName;
    private String phone;
    private String location;
    private String skills;
    private Integer experience;
    private String education;
    private String resumeUrl;
}
