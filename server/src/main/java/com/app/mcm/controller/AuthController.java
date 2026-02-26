package com.app.mcm.controller;

import com.app.mcm.dto.LoginRequest;
import com.app.mcm.dto.LoginResponseDTO;
import com.app.mcm.dto.RegisterRequest;
import com.app.mcm.dto.ResponseMsg;
import com.app.mcm.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // REGISTER
    @PostMapping("/register")
    public LoginResponseDTO register(@RequestBody RegisterRequest request,
                                     HttpServletResponse response) {
        return authService.register(request, response);
    }

    // LOGIN
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequest request,
                                  HttpServletResponse response) {
        return authService.login(request, response);
    }

    // LOGOUT
    @PostMapping("/logout")
    public ResponseMsg logout(HttpServletResponse response) {
        return authService.logout(response);
    }
}