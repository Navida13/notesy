package com.notesy.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.notesy.model.FeedBack;
import com.notesy.model.User;

public class FeedBackMapper implements RowMapper<FeedBack>{

	
	FeedBack feedback=null;
	@Override
	public FeedBack mapRow(ResultSet rs, int rowNum) throws SQLException {
//		System.out.println(rowNum);
//	//variable name
////		String email=rs.getString("email");//Column name
//		String rating=rs.getString("rating");
//		String review=rs.getString("review");
//		//creating object of FeedBack class
//		feedback=new FeedBack(email, rating, review);
		
		
		////fetching data from user and FeedBack table////
		String rating=rs.getString("rating");
		String review=rs.getString("review");
		String userName=rs.getString("name");
		//user has a name
		//feedback has a User
		//User class object creation
		User u=new User();
		u.setName(userName);
		
		feedback=new FeedBack();
		feedback.setRating(rating);
		feedback.setReview(review);
		feedback.setUser(u);
		
		return feedback;
	}
	
}
