package com.notesy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.notesy.model.FeedBack;
import com.notesy.repository.FeedBackRepository;

@Service
public class FeedBackService {

	private FeedBackRepository feedBackRepository;
	@Autowired
	public FeedBackService(FeedBackRepository feedBackRepository) {
		super();
		this.feedBackRepository = feedBackRepository;
	}
	public String feedback(@RequestBody FeedBack feedback) {
		feedBackRepository.save(feedback);
		return "Thank You for Your FeedBack";
	}
	
}
