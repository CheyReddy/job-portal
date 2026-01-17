package com.job_portal.repo;

import com.job_portal.entity.Job;
import com.job_portal.entity.Role;
import com.job_portal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    long countByRole(Role role);

    Page<User> findAll(Pageable pageable);

    Page<User> findByEmailContainingIgnoreCase(
            String email,
            Pageable pageable
    );




}
