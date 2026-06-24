package com.notesy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.notesy.dto.AdminDTO;
import com.notesy.dto.PasswordDTO;
import com.notesy.model.Admin;
import com.notesy.model.Contact;
import com.notesy.model.FeedBack;
import com.notesy.model.User;
import com.notesy.repository.UserRepository;
import com.notesy.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    private final UserRepository userRepository;
	private AdminService adminService;
	@Autowired
	public AdminController(AdminService adminService, UserRepository userRepository) {
		super();
		this.adminService = adminService;
		this.userRepository = userRepository;
	}
	
	//API for image upload
	//? wild card character->any data type->when we are returning multiple data types based on condition
	@PostMapping("/uploadPic")
	public ResponseEntity<?> uploadPic(@RequestPart ("profileImageDetail")Admin admin,@RequestPart("imageFile")MultipartFile imageFile) {
		long maxSize=2*1024*1024;
		if(imageFile.getSize()>maxSize)
		{
			return ResponseEntity.badRequest().body("File size exceeds 2MB limit");
		}
		System.out.println(admin.getDescripton());
		System.out.println(imageFile.getOriginalFilename());//predefined
		System.out.println(imageFile.getSize());
		Map<String,String>imageMap=adminService.uploadPic(admin,imageFile);
		return ResponseEntity.ok(imageMap);
	}
	
	
	//API for deleteContact
	@DeleteMapping("/deleteContact/{id}")
	public ResponseEntity<String>deleteContact(@PathVariable Integer id){
		adminService.deleteContact(id);
		return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
	}
	
	//API for allFeedBack
	@GetMapping("/allFeedBack")
	public ResponseEntity<List<FeedBack>> allFeedBack(){
		List<FeedBack>feedbackList=adminService.allFeedBack();
		if(feedbackList.size()>0) {
			return ResponseEntity.ok(feedbackList);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	//API for allUsers
	@GetMapping("/allUsers")
	public ResponseEntity<List<User>> allUsers() {
		List<User>userList=adminService.allUsers();
		if(userList.size()>0) {
			return ResponseEntity.ok(userList);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	//API for allContacts
		@GetMapping("/allContacts")
		public ResponseEntity<List<Contact>> allContacts() {
			List<Contact>contactList=adminService.allContacts();
			if(contactList.size()>0) {
				return ResponseEntity.ok(contactList);
			}
			else {
				return ResponseEntity.notFound().build();
			}
		}
	@PostMapping("/login")
	public String adminLogin(@RequestBody Admin admin) {
		return adminService.adminLogin(admin);
	}
	@GetMapping("/adminProfile/{email}")
	//value received from React
	public ResponseEntity <AdminDTO> adminProfile (@PathVariable String email)
	{
	Admin admin=adminService.getProfile(email);
	AdminDTO dto=null;
	if(admin!=null){
		dto=new AdminDTO(admin.getName(),admin.getPhone());
		dto.setProfilePic(admin.getProfilePic());
	return ResponseEntity.ok(dto);
	}
	else{
	return new ResponseEntity <AdminDTO>(dto,HttpStatus.NOT_FOUND);
	}
	}
	
	//API for edit password 
	@PatchMapping("/updatePassword/{email}")
	public String updatePassword(@RequestBody PasswordDTO pd,@PathVariable String email) {
		String message=adminService.updatePassword(pd, email);
		return message;
	}
	
	//API for edit profile
	@PutMapping("/editProfile/{email}")
	public ResponseEntity<Admin> editProfile(@RequestBody Admin admin,@PathVariable String email){
		Admin adminObj=adminService.editProfile(admin, email);
		if(adminObj!=null) {
			return new ResponseEntity<Admin>(adminObj,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Admin>(HttpStatus.NOT_FOUND);
		}
	}
}
