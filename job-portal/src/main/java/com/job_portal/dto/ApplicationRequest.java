package com.job_portal.dto;

import com.job_portal.entity.Job;
import com.job_portal.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequest {

    private String resumeUrl;

    private Long jobId;

}
