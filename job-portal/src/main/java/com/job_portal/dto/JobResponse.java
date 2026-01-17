package com.job_portal.dto;

import com.job_portal.entity.JobType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class JobResponse {
    private Long jobId;
    private String title;
    private String description;
    private Integer experience;
    private String location;
    private Double salary;
    private JobType jobType;
    private String companyName;
    private String recruiterName;
    private LocalDateTime createdAt;
    private Boolean enabled;
    private Boolean applied;
}
