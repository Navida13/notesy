package com.notesy.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;


@Entity
public class FeedBack {
	@Transient
	User user;//user object will not store in FeedBack table
	
	
	public int getId() {
		return id;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column(name="email",length=45,nullable=false)
	private String email;
	@Column(name="rating",length=5,nullable=false)
	private String rating;
	@Column(name="review",length=255,nullable=false)
	private String review;
	public String getEmail() {
		return email;
	}
	public String getRating() {
		return rating;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review=review;
	}
	public FeedBack() {
		super();
	}
	public FeedBack(String email,String rating,String review) {
		super();
		this.email=email;
		this.rating=rating;
		this.review=review;
	}
	
}
