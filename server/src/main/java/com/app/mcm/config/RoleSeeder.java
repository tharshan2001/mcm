package com.app.mcm.config;

import com.app.mcm.entity.Role;
import com.app.mcm.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleSeeder {

    @Bean
    CommandLineRunner seedRoles(RoleRepository roleRepository) {
        return args -> {
            // Check if roles already exist
            if (roleRepository.count() == 0) {
                Role admin = new Role();
                admin.setRoleName("ADMIN");
                admin.setPermissions("ALL"); // You can customize permissions

                Role customer = new Role();
                customer.setRoleName("CUSTOMER");
                customer.setPermissions("READ_ONLY"); // Example

                roleRepository.save(admin);
                roleRepository.save(customer);

                System.out.println("Roles seeded successfully!");
            } else {
                System.out.println("Roles already exist. Skipping seeding.");
            }
        };
    }
}