package com.job_portal.controller;

import com.job_portal.dto.UserRequest;
import com.job_portal.dto.UserResponse;
import com.job_portal.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Operation(
            summary = "Create User",
            description = "{    " +
                    "name: User,\n"+
                    "email: user@gmail.com,\n"+
                    "password: 123456,\n"+
                    "role: JOB_SEEKER |\n" +
                    "    RECRUITER |\n" +
                    "    ADMIN"+
                    "    }"
    )
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse registerUser(@RequestBody UserRequest request) {
        try {
            return userService.createUser(request);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to create User" + e.getMessage());
        }
    }

}
