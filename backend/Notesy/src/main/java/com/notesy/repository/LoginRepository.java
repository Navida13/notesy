package com.notesy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notesy.model.User;

public interface LoginRepository extends JpaRepository<User,String>{

}
