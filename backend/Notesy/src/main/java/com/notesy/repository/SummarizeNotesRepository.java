package com.notesy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notesy.model.SummarizeNotes;

public interface SummarizeNotesRepository extends JpaRepository<SummarizeNotes, Integer>{

	
	public List<SummarizeNotes>findByEmail(String email);
}
