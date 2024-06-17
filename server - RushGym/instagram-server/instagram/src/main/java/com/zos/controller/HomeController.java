package com.zos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
	
	@GetMapping("/api")
	public String homeControllerHandler() {
		
		return "welcome to instagram backend api";
		
	}

}
