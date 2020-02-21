package com.service;

import com.dao.MyUserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserServiceImpl implements UserDetailsService
{
    @Autowired
    private MyUserDao myUserDao;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        return myUserDao.loadUserByUsername(s);
    }
}
