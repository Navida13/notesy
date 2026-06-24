package com.notesy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notesy.model.Contact;
import com.notesy.model.FeedBack;
import com.notesy.repository.CommonRepository;
import com.notesy.repository.ContactRepository;

@Service
public class CommonService {
private ContactRepository contactRepository;
@Autowired
private CommonRepository commonRepository;
@Autowired
//parametrizedconstructor
public CommonService(ContactRepository contactRepository) {
	
	this.contactRepository = contactRepository;
}
public String addContact(Contact contact) {
	contactRepository.save(contact);
//	 String message=commonRepository.addContact(contact);
	 return "Contact added Successfully";
}


//view all feedbacks
public List<FeedBack>fetchFeedBack(){
	return commonRepository.fetchFeedback();
}
}
