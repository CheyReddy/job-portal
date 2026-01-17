package com.job_portal.repo;

import com.job_portal.entity.RecruiterProfile;
import com.job_portal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecruiterProfileRepository extends JpaRepository<RecruiterProfile, Long> {

    Optional<RecruiterProfile> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    List<RecruiterProfile> findByApprovedFalse();

    long countByApprovedTrue();

    long countByApprovedFalse();

    Optional<RecruiterProfile> findByUser(User user);


}
