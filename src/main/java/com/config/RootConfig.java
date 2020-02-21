package com.config;

import com.mysql.jdbc.jdbc2.optional.MysqlConnectionPoolDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.IOException;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
@ComponentScan(value = "com")
@ComponentScan(value = "com.dao")
@ComponentScan(value = "com.entity")
@ComponentScan(basePackages = {"com.config"},
                excludeFilters = {
                    @ComponentScan.Filter(type= FilterType.ANNOTATION, value= EnableWebMvc.class)//,
                        //@ComponentScan.Filter(type= FilterType.ANNOTATION, value= EnableWebSecurity.class)
                })
public class RootConfig implements TransactionManagementConfigurer
{
    @Autowired
    private Environment environment;

    @Bean
    public MysqlConnectionPoolDataSource mysqlConnectionPoolDataSource() {
        MysqlConnectionPoolDataSource dataSource = new MysqlConnectionPoolDataSource();
        System.out.println("url: " + environment.getProperty("mysql.url"));
        dataSource.setURL("jdbc:mysql://localhost:3306/test?useUniqueEncoding=true&characterEncoding=utf-8");
        dataSource.setUser("root");
        dataSource.setPassword("luozhiwei123");
        /*try {
            dataSource.getPooledConnection();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }*/
        return dataSource;
    }

    @Bean
    public SessionFactory mysqlSessionFactory() {
        LocalSessionFactoryBean sessionFactoryBean = new LocalSessionFactoryBean();
        sessionFactoryBean.setDataSource(mysqlConnectionPoolDataSource());
        Properties properties = new Properties();
        properties.setProperty("hibernate.show_sql","true");
        sessionFactoryBean.setHibernateProperties(properties);
        try {
            sessionFactoryBean.afterPropertiesSet();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return sessionFactoryBean.getObject();
    }

    @Bean
    public HibernateTransactionManager mysqlTransactionManager() {
        HibernateTransactionManager tx = new HibernateTransactionManager();
        tx.setSessionFactory(mysqlSessionFactory());
        return tx;
    }

    @Override
    public PlatformTransactionManager annotationDrivenTransactionManager() {
        return mysqlTransactionManager();
    }
}
