package com.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
public class MyLoginSAuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler
{
    private static final Logger logger = LoggerFactory.getLogger(MyLoginSAuccessHandler.class);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        // 获取Session
        HttpSession session = request.getSession();
        // 设置Session失效时间
        //Integer timeOut = Integer.parseInt(sessionTimeOut);
        //session.setMaxInactiveInterval(timeOut);
        // 登录成功，获取登录用户名，根据用户名查询用户信息
        String loginName = authentication.getName();
        /*
            这里为什么不用this.getSysUser(loginName); ?
            原因是此关乎到service本类中方法调用另一个方法事务不生效
            具体可阅读博客：
            https://blog.csdn.net/dapinxiaohuo/article/details/52092447
            https://blog.csdn.net/y943623901/article/details/50847334/
            利用Spring上下文间接代理服务调用程序
         */
        //UserInfo userInfo = ((MyLoginSuccessHandler) AopContext.currentProxy()).getSysUser(loginName);
        // 保存session信息
        //session.setAttribute(GlobalConstant.SESSION_USER_INFO, userInfo);
        //logger.info("loginName:{}, 登录系统...", userInfo.getLoginName());
        // 登录成功后页面跳转index页
        logger.info("info");
        logger.debug("debug");
        logger.error("error");
        logger.warn("warn");
        super.getRedirectStrategy().sendRedirect(request, response, "/index.do");
    }
}
