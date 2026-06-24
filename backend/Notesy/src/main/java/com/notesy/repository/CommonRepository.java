package com.notesy.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.notesy.mapper.FeedBackMapper;
import com.notesy.model.FeedBack;

@Repository
public class CommonRepository {
//	public String addContact(Contact contact) {
//		return "Contact added successfully";
//	}
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
//	public List<FeedBack> fetchFeedback() {
////		String sql="select * from feed_back where rating='⭐⭐⭐⭐⭐' order by id desc limit 2 ";
//		String sql="select * from feed_back order by id desc limit 2 ";
//		List <FeedBack>feedbackList=jdbcTemplate.query(sql, new FeedBackMapper());
//		return feedbackList;
//	}
	
	public List<FeedBack> fetchFeedback() {		
		//alias means another name of the table through which we can refer the table
		//alias means nickname
		//user table ->u
		//feed_back table ->f
		String sql="select u.name,f.rating,f.review from user u,feed_back f where u.email=f.email order by f.id desc limit 10";
		List <FeedBack>feedbackList=jdbcTemplate.query(sql, new FeedBackMapper());
		return feedbackList;
	}
}
