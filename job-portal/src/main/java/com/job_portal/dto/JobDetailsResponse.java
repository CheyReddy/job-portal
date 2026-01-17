package com.job_portal.dto;

import com.job_portal.entity.JobType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class JobDetailsResponse {
    private Long jobId;
    private String title;
    private String description;
    private Integer experience;
    private String location;
    private Double salary;
    private JobType jobType;
    private String companyName;
    private String companyWebsite;
    private String recruiterName;
    private Boolean enabled;
    private Boolean applied;
}
