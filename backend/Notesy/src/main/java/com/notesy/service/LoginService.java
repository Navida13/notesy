package com.notesy.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notesy.model.User;
import com.notesy.repository.LoginRepository;

@Service
public class LoginService {
	@Autowired
	private LoginRepository loginRepository;
	
	public String userLogin(User user) {
		String email=user.getEmail();
		String password=user.getPassword();
		System.out.println(email+password);
		Optional <User> opt=loginRepository.findById(email);
		String message="";
		if(opt.isPresent()) {
			User u=opt.get();
			if(u.getPassword().equals(password)) {
				message="success";
			}
			else {
				message="invalid password";
			}
		}
		else {
			message="invalid email";
		}
		return message;
	}

}
