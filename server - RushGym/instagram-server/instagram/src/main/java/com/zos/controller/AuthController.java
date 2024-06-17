package com.zos.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import com.zos.exception.UserException;
import com.zos.model.User;
import com.zos.repository.UserRepository;
import com.zos.services.UserService;

@RestController
public class AuthController {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private UserService userService;
	
	
	@GetMapping("/signin")
	public ResponseEntity<User> signinHandler(Authentication auth) throws BadCredentialsException{
		

		
		 try {
		        User user = userRepo.findByEmail(auth.getName())
		            .orElseThrow(() -> new BadCredentialsException("Invalid Username or password"));
		        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
		    } catch (BadCredentialsException ex) {
		        throw new BadCredentialsException("Invalid username or password");
		    }
	
	}
	
	@PostMapping("/signup")
	public ResponseEntity<User> registerUserHandler(@RequestBody User user) throws UserException{
		

		
		User createdUser=userService.registerUser(user);

		System.out.println("createdUser --- "+createdUser);
		
		return new ResponseEntity<User>(createdUser,HttpStatus.CREATED);
		
		
	}
	
	

}
