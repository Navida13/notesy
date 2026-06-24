package com.notesy.dto;

public class AdminDTO {
	
	private String name,phone;
	private String profilePic;
	

	public AdminDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	public AdminDTO(String name, String phone) {
		super();
		this.name = name;
		this.phone = phone;
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
	
}
