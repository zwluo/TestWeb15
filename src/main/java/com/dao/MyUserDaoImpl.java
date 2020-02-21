package com.dao;

import com.entity.MyUserDetails;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class MyUserDaoImpl implements MyUserDao
{
    @Autowired
    private SessionFactory mysqlSessionFactory;

    @Override
    public UserDetails loadUserByUsername(String userName) {
        String sql = "select username,password,authority from my_user_info where username = :userName";
        Session session = mysqlSessionFactory.getCurrentSession();
        Query query = session.createSQLQuery(sql).setParameter("userName", userName);
        List<MyUserDetails> list = query.setResultTransformer(Transformers.aliasToBean(MyUserDetails.class)).list();

        if(list.size() > 0) {
            MyUserDetails myUserDetails = new MyUserDetails();
            myUserDetails.setUsername(userName);
            myUserDetails.setPassword(list.get(0).getPassword());
            myUserDetails.setAuthority(list.get(0).getAuthority());
            return myUserDetails;
        }
        return null;
    }
}
