package com.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class MyWebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer
{

    /**
     * 实际上，AbstractAnnotationConfigDispatcherServletInitializer
     * 会同时创建DispatcherServlet和ContextLoaderListener。
     * GetServlet-ConfigClasses()方法返回的带有@Configuration注解的类将会用来定
     * 义DispatcherServlet应用上下文中的bean。
     * getRootConfigClasses()方法返回的带有@Configuration注解的类将会用来配
     * 置ContextLoaderListener创建的应用上下文中的bean。
     * @return
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[]{RootConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{WebConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"*.do"};
    }
}
