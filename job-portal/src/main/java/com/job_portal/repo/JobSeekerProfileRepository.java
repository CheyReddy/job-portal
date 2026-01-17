package com.job_portal.repo;

import com.job_portal.entity.JobSeekerProfile;
import com.job_portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobSeekerProfileRepository extends JpaRepository<JobSeekerProfile, Long> {
    Optional<JobSeekerProfile> findByUserId(long userId);
    boolean existsByUser(User user);
}
