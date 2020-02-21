package com.dao;

import org.springframework.security.core.userdetails.UserDetails;

public interface MyUserDao
{
    UserDetails loadUserByUsername(String userName);

}
