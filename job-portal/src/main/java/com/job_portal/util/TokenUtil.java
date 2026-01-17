package com.job_portal.util;
import java.security.MessageDigest;
import java.util.Base64;

public class TokenUtil {

    public static String sha256(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(value.getBytes());
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Token hashing failed");
        }
    }
}

