package com.notesy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.notesy.model.FeedBack;
import com.notesy.service.FeedBackService;

@RestController
@CrossOrigin("*")
public class FeedBackController {
 private FeedBackService feedBackService;

 @Autowired
 public FeedBackController(FeedBackService feedBackService) {
	super();
	this.feedBackService = feedBackService;
 }
 @PostMapping("/feedback")
	public String feedback(@RequestBody FeedBack feedback) {
//		System.out.println("Email is "+feedback.getEmail());
//		System.out.println("Rating is "+feedback.getRating());
//		System.out.println("Review is "+feedback.getReview());
		return feedBackService.feedback(feedback);
	}
}
