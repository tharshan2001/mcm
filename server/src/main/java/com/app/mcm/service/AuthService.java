package com.app.mcm.service;

import com.app.mcm.dto.LoginRequest;
import com.app.mcm.dto.LoginResponseDTO;
import com.app.mcm.dto.RegisterRequest;
import com.app.mcm.dto.ResponseMsg;
import com.app.mcm.entity.Role;
import com.app.mcm.entity.User;
import com.app.mcm.repository.RoleRepository;
import com.app.mcm.repository.UserRepository;
import com.app.mcm.config.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // REGISTER
    public LoginResponseDTO register(RegisterRequest request, HttpServletResponse response) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        Role userRole = roleRepository.findByRoleName("CUSTOMER")
                .orElseThrow(() -> new RuntimeException("Default role not found"));

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(userRole);
        userRepository.save(user);

        // Auto-login after registration
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().getRoleName());
        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        response.addCookie(cookie);

        return new LoginResponseDTO(user.getFullName(), user.getRole().getRoleName());
    }

    // LOGIN
    public LoginResponseDTO login(LoginRequest request, HttpServletResponse response) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().getRoleName());

        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        response.addCookie(cookie);

        return new LoginResponseDTO(user.getFullName(), user.getRole().getRoleName());
    }

    // LOGOUT
    public ResponseMsg logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return new ResponseMsg("Logged out successfully");
    }
}