package com.job_portal.dto;

import lombok.Data;

@Data
public class JobSeekerProfileRequest {
    private String fullName;
    private String phone;
    private String location;
    private String skills;
    private Integer experience;
    private String education;
    private String resumeUrl;
}
