package com.job_portal.controller;

import com.job_portal.dto.AdminJobResponse;
import com.job_portal.service.AdminJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/jobs")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminJobController {
    private final AdminJobService adminJobService;

    @GetMapping
    public Page<AdminJobResponse> getJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search
    ) {
        return adminJobService.getJobs(search,
                PageRequest.of(page, size, Sort.by("createdAt").descending())
        );
    }

    @PutMapping("/{id}/enable")
    public void enableJob(@PathVariable Long id) {
        adminJobService.enableJob(id);
    }

    @PutMapping("/{id}/disable")
    public void disableJob(@PathVariable Long id) {
        adminJobService.disableJob(id);
    }
}
