package com.entity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class MyBCryptPasswordEncoder extends BCryptPasswordEncoder
{
}
