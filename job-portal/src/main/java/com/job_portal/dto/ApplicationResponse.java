package com.job_portal.dto;

import com.job_portal.entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationResponse {
    private Long applicationId;

    private Long jobId;

    private String jobTitle;

    private String companyName;

    private ApplicationStatus status;

    private LocalDateTime appliedAt;
}
