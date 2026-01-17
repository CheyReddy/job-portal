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
public class RecruiterApplicantResponse {

    private Long applicationId;
    private Long jobId;
    private String jobTitle;

    private Long applicantId;
    private String applicantName;
    private String applicantEmail;

    private String resumeUrl;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
}

