package com.notesy.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.notesy.dto.PasswordDTO;
import com.notesy.model.Admin;
import com.notesy.model.Contact;
import com.notesy.model.FeedBack;
import com.notesy.model.User;
import com.notesy.repository.AdminRepository;
import com.notesy.repository.ContactRepository;
import com.notesy.repository.FeedBackRepository;
import com.notesy.repository.UserRepository;

@Service
public class AdminService {
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private ContactRepository contactRepository;
	@Autowired
	private FeedBackRepository feedBackRepository;
	@Autowired
	private UserRepository userRepository;
	
	//method for password updation
	
	public String updatePassword(PasswordDTO pd,String email) {
		Optional<Admin>opt=adminRepository.findById(email);
		String status="";
		if(opt.isPresent()) {
			Admin ad=opt.get();
			String adminOldPass=ad.getPassword();//admin123
			String reactOldPassword=pd.getOldpass();
			if(adminOldPass.equals(reactOldPassword)) {
				String cpass=pd.getConfirmpass();
				ad.setPassword(cpass);
				adminRepository.save(ad);//password will be updated and saved
				status="success";
			}
			else {
			
			status="error";
			}
		}
		return status;
	}
	
	//method for delete contact
	public void deleteContact(Integer id){
		contactRepository.deleteById(id);
	}
	
	//method for all users
	public List<User>allUsers()
	{
		return userRepository.findAll();//select * from contact
	}
	
	//method for all feedback
	public List<FeedBack>allFeedBack(){
		return feedBackRepository.findAll();
		}
	
	//method for all contacts
	public List<Contact>allContacts()
	{
		return contactRepository.findAll();//select * from contact
	}
	
//	Select * from admin where email=admin.getEmail() and password=admin.getPassword()
	public Admin getProfile(String email)
	{
	Optional <Admin> opt=adminRepository.findById(email);
	Admin admin=null;
	if(opt.isPresent()){
	admin=opt.get();
	}
	return admin;
	}
public String adminLogin(Admin admin) 
{
	String email=admin.getEmail();
	String password=admin.getPassword();
	System.out.println(email+password);
	Optional<Admin> opt=adminRepository.findById(email);
	String message="";
	if(opt.isPresent()) {
		Admin ad=opt.get();//fetch the value from the container(Optional)
		if(ad.getPassword().equals(password))//from database from string
		{
			message= "success";
		}
		else {
			message= "Invalid password";
		}
	}
	else {
		message= "Invalid Email";
	}
	return message;
}
public Admin editProfile(Admin modifiedAdminObject,String email) {
	Optional <Admin> opt=adminRepository.findById(email);
	Admin ad=null;
	if(opt.isPresent()) {
		ad=opt.get();//fetch the admin object based on email
		//overwrite old date with modified data
		String modifiedName=modifiedAdminObject.getName();
		String modifiedPhone=modifiedAdminObject.getPhone();
		ad.setName(modifiedName);
		ad.setPhone(modifiedPhone);
		adminRepository.save(ad);
	}
	return ad;
}

public Map<String,String> uploadPic(Admin admin, MultipartFile imageFile) {
	String fileName=imageFile.getOriginalFilename();
	long timeStamp=System.currentTimeMillis()%100000000;
	System.out.println(timeStamp);
	String uniqueFileName=timeStamp+"_"+fileName;
	//Go to root directory
	String projectRoot=System.getProperty("user.dir");
	System.out.println("Project root is "+projectRoot);
	//reach to upload directory
	String uploadDir=projectRoot+"/uploads/profileimages/";
	Map<String,String>imageMap=new HashMap<>();
	try {
		
		//setting the target folder for image upload with image name
		File targetFile=new File(uploadDir,uniqueFileName);
		imageFile.transferTo(targetFile);
		
		//Generating Image URL
		String IMAGEURL="http://localhost:8080/uploads/profileimages/"+uniqueFileName;
		
		
		String email=admin.getEmail();//coming from react
		Optional <Admin> opt=adminRepository.findById(email);
		if(opt.isPresent()) {
			
			Admin ad=opt.get();
			String desc=admin.getDescripton();//coming from react
			//update Admin profile image with description
			ad.setProfilePic(uniqueFileName);
			ad.setDescripton(desc);
			adminRepository.save(ad);
			
			imageMap.put("imageURL", IMAGEURL);
			imageMap.put("email",email);
		}
	}
	catch(Exception e) {
		e.printStackTrace();
		System.out.println("Image Upload Failed");
	}
	return imageMap;
}
}
