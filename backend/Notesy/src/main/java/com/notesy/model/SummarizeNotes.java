package com.notesy.model;

import java.sql.Date;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class SummarizeNotes {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String title;
	private String email;
	
	@CreationTimestamp
	private LocalDateTime date;
	
	@Lob
	@Column(columnDefinition = "LONGTEXT")
	private String summarizeNotes;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	public String getSummarizeNotes() {
		return summarizeNotes;
	}
	public void setSummarizeNotes(String summarizeNotes) {
		this.summarizeNotes = summarizeNotes;
	}
	public int getId() {
		return id;
	}
	
	
}
