package com.config;

import com.entity.MyBCryptPasswordEncoder;
import com.service.MyUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter
{
    @Autowired
    private MyUserServiceImpl userDetailsService;

    @Autowired
    private MyLoginSAuccessHandler myLoginSAuccessHandler;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/static/**");
        // 过滤Session 失效URL
        //web.ignoring().antMatchers("/session/invalid");
        //web.ignoring().antMatchers("/swagger-ui.html").antMatchers("/webjars/**").antMatchers("/v2/**").antMatchers("/swagger-resources/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        System.out.println("config");
        http.csrf().disable();
        http.headers().frameOptions().sameOrigin().httpStrictTransportSecurity().disable();
        http.authorizeRequests().anyRequest().authenticated()
                .antMatchers("/**").hasRole("USER")
                .and().formLogin().loginPage("/login.do").permitAll()

                .loginProcessingUrl("/login").successHandler(myLoginSAuccessHandler).permitAll()

                .and().logout().logoutUrl("/logout").logoutSuccessUrl("/login.do");

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        MyBCryptPasswordEncoder myPasswordEncoder = new MyBCryptPasswordEncoder();
        auth.userDetailsService(userDetailsService).passwordEncoder(myPasswordEncoder);
    }
}
