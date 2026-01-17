package com.job_portal.service.impl;

import com.job_portal.dto.AuthRequest;
import com.job_portal.dto.AuthResponse;
import com.job_portal.repo.RecruiterProfileRepository;
import com.job_portal.repo.UserRepository;
import com.job_portal.service.AuthService;
import com.job_portal.service.UserService;
import com.job_portal.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AppUserDetailsService appUserDetailsService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final RecruiterProfileRepository recruiterProfileRepository;

    @Override
    public AuthResponse processLogin(@RequestBody AuthRequest request) throws Exception {
        authenticate(request.getEmail(),request.getPassword());
        final UserDetails userDetails = appUserDetailsService.loadUserByUsername(request.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails.getUsername());
        String role = userService.getUserRole(request.getEmail());
        final long expiresIn = (jwtUtil.extractExpiration(jwtToken)).getTime();
        var user = userService.getUserByEmail(request.getEmail());

        boolean profileCompleted = false;
        if ("RECRUITER".equals(role)){
            profileCompleted = recruiterProfileRepository.existsByUserId(user.getId());
        }

        return new AuthResponse(request.getEmail(), role, jwtToken, expiresIn,profileCompleted);
    }

    private void authenticate(String email, String password) throws Exception {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        }
        catch (DisabledException e){
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "User account is disabled. Please contact admin."
            );
        }
        catch (BadCredentialsException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email or password is incorrect");
        }
    }
}
