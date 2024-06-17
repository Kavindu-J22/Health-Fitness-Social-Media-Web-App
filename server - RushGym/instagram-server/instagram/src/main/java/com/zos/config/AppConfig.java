package com.zos.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class AppConfig {
	
	@Bean
	public SecurityFilterChain securityConfigration(HttpSecurity http) throws Exception {
		

		
		http
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.authorizeHttpRequests()
		.requestMatchers(HttpMethod.POST,"/signup").permitAll()
		.requestMatchers(HttpMethod.GET,"/api").permitAll()
		.anyRequest().authenticated()
		.and()
		.addFilterAfter(new JwtGenratorFilter(), BasicAuthenticationFilter.class)
		.addFilterBefore(new JwtValidationFilter(), BasicAuthenticationFilter.class)
		.exceptionHandling()
        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
        .and()
		.csrf().disable()
		.cors().configurationSource( new CorsConfigurationSource() {
			
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				
				
				
				CorsConfiguration cfg = new CorsConfiguration();
				
//				cfg.setAllowedOrigins(Collections.singletonList("*"));
				cfg.setAllowedOrigins(Arrays.asList(
						"https://instagram-clone-java-full-stack.vercel.app",
						"http://localhost:3000", 
						"http://localhost:4000"));
				//cfg.setAllowedMethods(Arrays.asList("GET", "POST","DELETE","PUT"));
				cfg.setAllowedMethods(Collections.singletonList("*"));
				cfg.setAllowCredentials(true);
				cfg.setAllowedHeaders(Collections.singletonList("*"));
				cfg.setExposedHeaders(Arrays.asList("Authorization"));
				cfg.setMaxAge(3600L);
				return cfg;
				
				
				
			}
		})
		.and()
		.formLogin()
		.and()
		.httpBasic();
		
		return http.build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}

