package com.job_portal.dto;

import com.job_portal.entity.JobType;
import com.job_portal.entity.User;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @Min(0)
    private Integer experience;
    @NotBlank
    private String location;
    @Min(0)
    private Double salary;
    @NotNull
    private JobType jobType;
}
