package com.job_portal.controller;

import com.job_portal.dto.AuthRequest;
import com.job_portal.dto.AuthResponse;
import com.job_portal.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Operation(
            summary = "Login User",
            description = "Generate JWT Token"
    )
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse userLogin(@io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = AuthRequest.class),
                    examples = @ExampleObject(
                            name = "Login Request",
                            value = """
                                {
                                  "email": "user@example.com",
                                  "password": "Test@123"
                                }
                                """
                    )
            )
    )@RequestBody AuthRequest request) throws Exception {
        return authService.processLogin(request);
    }

}
