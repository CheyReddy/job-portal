package com.job_portal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;
    private Integer experience;
    private String location;
    private Double salary;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "recruiter_profile_id")
    private RecruiterProfile recruiterProfile;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

}
