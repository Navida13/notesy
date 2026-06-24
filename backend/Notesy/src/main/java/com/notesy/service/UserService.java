package com.notesy.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.notesy.model.ShareNotes;
import com.notesy.model.SummarizeNotes;
import com.notesy.model.User;
import com.notesy.repository.ShareNotesRepository;
import com.notesy.repository.SummarizeNotesRepository;
import com.notesy.repository.UserRepository;
import com.notesy.userdto.PasswordDTO;

@Service
public class UserService {
private UserRepository userRepository;

@Autowired
public UserService(UserRepository userRepository) {
	super();
	this.userRepository = userRepository;
}
@Autowired
private SummarizeNotesRepository summarizeNotesRepository;

@Autowired
private ShareNotesRepository shareNotesRepository;

public String summarize(SummarizeNotes summarizeNotes) {
	
	 summarizeNotesRepository.save(summarizeNotes);
	 return "Summarized Successfully";
}

public List<SummarizeNotes> history(String email) {
	return summarizeNotesRepository.findByEmail(email);
}

public String registration(User user) {
	userRepository.save(user);
	return "Regestration Done Successfully";
//	return userRepository.registration(user);
}


//public String userLogin(Login login) {
//	String email=login.getEmail();
//	String password=login.getPassword();
//	System.out.println(email+password);
//	Optional <User> opt=userRepository.findById(email);
//	String message="";
//	if(opt.isPresent()) {
//		User user=opt.get();
//		if(user.getPassword().equals(password)) {
//			message="success";
//		}
//		else {
//			message="invalid password";
//		}
//	}
//	else {
//		message="invalid email";
//	}
//	return message;
//}

public User getProfile(String email) {
	Optional <User> opt=userRepository.findById(email);
	User user=null;
	if(opt.isPresent()) {
		user=opt.get();
		}
	return user;
}

public String updatePassword(PasswordDTO pd,String email) {
	Optional <User> opt=userRepository.findById(email);
	String status="";
	if(opt.isPresent()) {
		User user=opt.get();
		String userOldPass=user.getPassword();
		String reactOldPass=pd.getOldpass();
		if(userOldPass.equals(reactOldPass)) {
			user.setPassword(pd.getConfirmpass());
			userRepository.save(user);
			status="success";
		}
		else {
			status="error";
		}
	}
	return status;
}

public User editProfile(User modifiedUserObject,String email) {
	Optional <User> opt=userRepository.findById(email);
	User user=null;
	if(opt.isPresent()) {
		user=opt.get();
		String modifiedName=modifiedUserObject.getName();
		String modifiedPhone=modifiedUserObject.getPhone();
		String modifiedCity=modifiedUserObject.getCity();
		user.setName(modifiedName);
		user.setPhone(modifiedPhone);
		user.setCity(modifiedCity);
		userRepository.save(user);
	}
	return user;
}

//public Map<String,String> uploadFile(User user,MultipartFile File){
//	String fileName=File.getOriginalFilename();
//	long timeStamp=System.currentTimeMillis()%100000000;
//	System.out.println(timeStamp);
//	String uniqueFileName=timeStamp+""+fileName;
//	String projectRoot=System.getProperty("user.dir");
//	String uploadDir=projectRoot+"/uploads/userprofileimages/";
//	Map<String,String> fileMap=new HashMap<>();
//	try {
//		File targetFile=new File(uploadDir,uniqueFileName);
//		File.transferTo(targetFile);
//		String IMAGEURL="http://localhost:8080/uploads/userprofileimages/"+uniqueFileName;
//		
//		String email=user.getEmail();
//		Optional<User> opt=userRepository.findById(email);
//		if(opt.isPresent()) {
//			User usr=opt.get();
//			String title=user.getTitle();
//			usr.setFile(uniqueFileName);
//			usr.setTitle(title);
//			userRepository.save(usr);
//			fileMap.put("imageURL", IMAGEURL);
//			fileMap.put("email", email);
//		}
//	}
//	catch(Exception e) {
//		e.printStackTrace();
//		System.out.println("File Upload Failed");
//	}
//	return fileMap;
//}

public String checkEmail(String email) {
	String status="";
	Optional<User> opt=userRepository.findById(email);
    if(opt.isPresent()) {
    	User user=opt.get();
    	if(user.getEmail().equals(email))
    		status="success";
    	}
    	else {
    		status="error";
    	}
    return status;
}
public Map<String,String> uploadFile(ShareNotes sharenotes, MultipartFile pdfFile){

    String pdfFileName = pdfFile.getOriginalFilename();

    String projectRoot = System.getProperty("user.dir");
    String uploadDir = projectRoot + "/uploads/notessummarizefile";

    Map<String, String> fileMap = new HashMap<>();
    try {
        File targetFile = new File(uploadDir, pdfFileName);
        pdfFile.transferTo(targetFile);

        String IMAGEURL = "http://localhost:8080/uploads/notessummarizefile/" + pdfFileName;

       
	 ShareNotes sh = new ShareNotes();

     sh.setSenderEmail(sharenotes.getSenderEmail());
     sh.setReceiverEmail(sharenotes.getReceiverEmail());
     sh.setSubject(sharenotes.getSubject());
     sh.setFileName(pdfFileName);
     
     shareNotesRepository.save(sh);
     fileMap.put("fileURL", IMAGEURL);
     fileMap.put("senderEmail", sharenotes.getSenderEmail());
    } catch (Exception e) {
        e.printStackTrace();
        System.out.println("file upload failed");
    }

    return fileMap;
    
}
	

public Map<String,String> uploadPic(User user, MultipartFile imageFile) {
	String fileName=imageFile.getOriginalFilename();
	long timeStamp=System.currentTimeMillis()%100000000;
	System.out.println(timeStamp);
	String uniqueFileName=timeStamp+"_"+fileName;
	//Go To Root Directory
	String projectRoot=System.getProperty("user.dir");
	System.out.println(projectRoot);
	//reach to upload directory
	String uploadDir=projectRoot+"/uploads/userprofileimages/";
	Map <String,String>imageMap=new HashMap<>();
	try {
		//setting the target folder for image upload with image name
		File targetFile=new File(uploadDir,uniqueFileName);
		imageFile.transferTo(targetFile);
		//Generating Image URL
		String IMAGEURL="http://localhost:8080/uploads/userprofileimages/"+uniqueFileName;
		
		String email=user.getEmail();
		Optional<User> opt=userRepository.findById(email);
		if(opt.isPresent()) {
			User usr=opt.get();
			String desc=user.getDescription();//coming from react
			usr.setProfilePic(uniqueFileName);
			usr.setDescription(desc);
			userRepository.save(usr);
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


public List<ShareNotes> getNotesByReceiver(String email) {
    return shareNotesRepository.findByreceiverEmail(email);
}



//public String login(Login login) {
//	return userRepository.login(login);
//}
}
