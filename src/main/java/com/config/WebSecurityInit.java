package com.config;

import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

/**
 * 引入Spring Security
 * If we were using Spring elsewhere in our application we probably already had a WebApplicationInitializer that is loading our Spring Configuration. If we use the previous configuration we would get an error. Instead, we should register Spring Security with the existing ApplicationContext. For example, if we were using Spring MVC our SecurityWebApplicationInitializer would look something like the following:
 */
public class WebSecurityInit extends AbstractSecurityWebApplicationInitializer
{
}
