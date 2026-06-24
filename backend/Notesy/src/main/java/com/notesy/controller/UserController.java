package com.notesy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import com.notesy.model.ShareNotes;
import com.notesy.model.SummarizeNotes;
import com.notesy.model.User;
import com.notesy.service.LoginService;
import com.notesy.service.UserService;
import com.notesy.userdto.PasswordDTO;
import com.notesy.userdto.UserLoginDTO;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {
	private UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}
	@Autowired
	private LoginService loginService;
	
	@PostMapping("/summarize")
	public String summarize(@RequestBody SummarizeNotes summarizeNotes) {
		 return userService.summarize(summarizeNotes);
		 
	}
	
	@GetMapping("/summarizedhistory/{email}")
	public ResponseEntity<List<SummarizeNotes>> history(@PathVariable String email ) {
		List<SummarizeNotes> summarizeNotesList=userService.history(email);
		if(summarizeNotesList.size()>0) {
			return ResponseEntity.ok(summarizeNotesList);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/login")
	public String userLogin(@RequestBody User user) {
		return loginService.userLogin(user);
	}

	@PostMapping("/registration")
	public String registration(@RequestBody User user) {
//		System.out.println("Name is "+user.getName());
//		System.out.println("Email is "+user.getEmail());
//		System.out.println("Phone Number is "+user.getPhone());
//		System.out.println("Password is "+user.getPassword());
//		System.out.println("City is is "+user.getCity());
		return userService.registration(user);
	}
	
//	@PostMapping("/uploadNotes")
//	public ResponseEntity<Map<String,String>> uploadNotes(@RequestPart("notesdetail") User user,@RequestPart("File") MultipartFile File){
//		Map<String,String> fileMap=userService.uploadFile(user, File);
//		return ResponseEntity.ok(fileMap);
//	}
	
	@PostMapping("/uploadUserPic")
	public ResponseEntity<Map<String,String>> uploadPic(@RequestPart("userProfileImageDetail") User user,@RequestPart("imageFile") MultipartFile imageFile) {
		System.out.println(user.getDescription());
		System.out.println(imageFile.getOriginalFilename());
		System.out.println(imageFile.getSize());
		Map<String,String> imageMap=userService.uploadPic(user,imageFile);
		return ResponseEntity.ok(imageMap);
	}
	
	@GetMapping("/receivenotes/{email}")
	public ResponseEntity<?> getReceivedNotes(@PathVariable String email) {

	    List<ShareNotes> notes = userService.getNotesByReceiver(email);

	    if (notes.isEmpty()) {
	        return ResponseEntity.ok("No notes found");
	    }

	    return ResponseEntity.ok(notes);
	}
	
	
	
	@PostMapping("/uploadFile")
	public ResponseEntity<Map<String,String>> uploadFile(@RequestPart("notessummarizefile") ShareNotes shareNotes,
			@RequestPart("pdfFile") MultipartFile pdfFile) {

		System.out.println(shareNotes.getSubject());
		System.out.println(pdfFile.getOriginalFilename());
		System.out.println(pdfFile.getSize());

		Map<String,String> filemap = userService.uploadFile(shareNotes, pdfFile);
		return ResponseEntity.ok(filemap);    
	}
	
	@GetMapping("/checkEmail/{email}")
	public String checkEmail(@PathVariable String email) {
		return userService.checkEmail(email);
	}
	
//	@PostMapping("/login")
//	public String userLogin(@RequestBody Login login) {
//		return userService.userLogin(login);
//	}
	
	@GetMapping("/userProfile/{email}")
	public ResponseEntity <UserLoginDTO> adminProfile(@PathVariable String email){
		User user =userService.getProfile(email);
		UserLoginDTO dto=null;
		if(user!=null) {
			dto=new UserLoginDTO(user.getName(),user.getPhone(),user.getCity());
			dto.setProfilePic(user.getProfilePic());
			return ResponseEntity.ok(dto);
		}
		else {
			return new ResponseEntity<UserLoginDTO>(dto,HttpStatus.NOT_FOUND);
		}
	}
	
	@PatchMapping("/updateUserPassword/{email}")
	public String updatePassword(@RequestBody PasswordDTO pd,@PathVariable String email) {
		String message=userService.updatePassword(pd,email);
		return message;
	}
	
	@PutMapping("/userEditProfile/{email}")
	public ResponseEntity<User> editProfile(@RequestBody User user,@PathVariable String email){
		User userObj=userService.editProfile(user, email);
		if(userObj!=null) {
			return new ResponseEntity<User>(userObj,HttpStatus.OK);
		}
		else {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}
//	@PostMapping("/login")
//	public String Login(@RequestBody Login login) {
//		System.out.println("Name is "+login.getName());
//		System.out.println("Email is "+login.getEmail());
//		System.out.println("Phone is "+login.getPhone());
//		System.out.println("Password is "+login.getPassword());
//		System.out.println("City is "+login.getCity());
//		return userService.login(login);
//	}
}
