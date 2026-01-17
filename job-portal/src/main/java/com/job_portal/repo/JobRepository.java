package com.job_portal.repo;

import com.job_portal.entity.Job;
import com.job_portal.entity.JobType;
import com.job_portal.entity.RecruiterProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    Optional<Job> findById(Long jobId);

    List<Job> findByLocation(String location);

    List<Job> findByJobType(JobType jobType);

    List<Job> findByRecruiterProfile(RecruiterProfile recruiterProfile);

    @Query("""
               SELECT j FROM Job j
                       WHERE LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                          OR LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%'))
                          OR LOWER(j.recruiterProfile.companyName)
                             LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    Page<Job> searchJobs(@Param("keyword") String keyword, Pageable pageable);

    long count();

    @Query("""
            SELECT MONTH(j.createdAt), COUNT(j) FROM Job j GROUP BY MONTH(j.createdAt)
            """)
    List<Object[]> jobsPerMonth();

    Page<Job> findAll(Pageable pageable);

    Page<Job> findByRecruiterProfileAndTitleContainingIgnoreCase(RecruiterProfile recruiterProfile, String title, Pageable pageable);
}
