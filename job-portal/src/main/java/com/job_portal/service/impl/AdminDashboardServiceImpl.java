package com.job_portal.service.impl;

import com.job_portal.dto.AdminStatsResponse;
import com.job_portal.entity.Role;
import com.job_portal.repo.JobRepository;
import com.job_portal.repo.RecruiterProfileRepository;
import com.job_portal.repo.UserRepository;
import com.job_portal.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final UserRepository userRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final JobRepository jobRepository;

    @Override
    public AdminStatsResponse getDashboardStats() {

        Map<String, Long> jobsPerMonthMap = new LinkedHashMap<>();

        for(Object[] row : jobRepository.jobsPerMonth()){
            Integer month = (Integer) row[0];
            Long count = (Long) row[1];
            jobsPerMonthMap.put(Month.of(month).name(), count);
        }

        return AdminStatsResponse.builder()
                .totalUsers(userRepository.count())
                .totalRecruiters(userRepository.countByRole(Role.RECRUITER))
                .totalJobs(jobRepository.count())
                .pendingRecruiters(recruiterProfileRepository.countByApprovedFalse())
                .jobsPerMonth(jobsPerMonthMap)
                .build();
    }
}
