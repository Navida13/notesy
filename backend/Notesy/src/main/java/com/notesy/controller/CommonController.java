package com.notesy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.notesy.model.Contact;
import com.notesy.model.FeedBack;
import com.notesy.service.CommonService;


@RestController
@CrossOrigin("*")
public class CommonController {

	private CommonService commonService;

	@Autowired
	public CommonController(CommonService commonService) {
		super();
		this.commonService = commonService;
	}


	@PostMapping("/addContact")
	public String addContact(@RequestBody Contact  contact)
	
	{
//		System.out.println("Name is"+contact.getName());
//		System.out.println("Email is"+contact.getEmail());
//		System.out.println("Phone Number is"+contact.getPhone());
//		System.out.println("Question is "+contact.getQuestion());
		return commonService.addContact(contact);
		
	}
	
	
	//view all feedback
	
	@GetMapping("/fetchFeedback")
	public ResponseEntity<List<FeedBack>>fetchFeedBack(){
		List<FeedBack>fList=commonService.fetchFeedBack();
		return ResponseEntity.ok(fList);
	}
}
