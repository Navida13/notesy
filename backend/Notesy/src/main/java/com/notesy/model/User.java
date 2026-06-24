package com.notesy.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {
	@Id
	@Column(name="email",length=45,nullable=false,unique=true)
private String email;
	@Column(name="password",length=45,nullable=false)
	private String password;
	@Column(name="name",length=45,nullable=false)
	private String name;
	@Column(name="phone",length=45,nullable=false)
	private String phone;
	@Column(name="city",length=45,nullable=false)
	private String city;
	private String profilePic;
	private String description;
//	private String title;
//	private String file;
//	
//	
//
//public String getTitle() {
//		return title;
//	}
//
//
//
//	public void setTitle(String title) {
//		this.title = title;
//	}
//
//
//
//	public String getFile() {
//		return file;
//	}
//
//
//
//	public void setFile(String file) {
//		this.file = file;
//	}



public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getPhone() {
		return phone;
	}



	public void setPhone(String phone) {
		this.phone = phone;
	}



	public String getCity() {
		return city;
	}



	public void setCity(String city) {
		this.city = city;
	}



	public String getProfilePic() {
		return profilePic;
	}



	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	

	



public String getDescription() {
		return description;
	}



	public void setDescription(String description) {
		this.description = description;
	}



public User() {
		super();
		// TODO Auto-generated constructor stub
	}



//public String getName() {
//	return name;
//}
//public String getEmail() {
//	return email;
//}
//public String getPassword() {
//	return password;
//}
//public String getPhone() {
//	return phone;
//}
//public String getCity() {
//	return city;
//}
//public User() {
//	super();
//// TODO Auto-generated constructor stub
//}
public User(String name, String email, String password,String phone, String city) {
	super();
	this.name = name;
	this.email = email;
	this.phone = phone;
	this.password = password;
	this.city = city;
}
}
