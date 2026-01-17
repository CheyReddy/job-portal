package com.job_portal.repo;

import com.job_portal.entity.Application;
import com.job_portal.entity.ApplicationStatus;
import com.job_portal.entity.Job;
import com.job_portal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    long countByApplicantId(Long applicantId);

    long countByApplicantIdAndStatus(Long applicantId, ApplicationStatus status);

    boolean existsByJobIdAndApplicantId(Long jobId, Long applicantId);

    Page<Application> findByApplicantId(Long userId, Pageable pageable);

    Page<Application> findByJobId(Long jobId, Pageable pageable);
}
