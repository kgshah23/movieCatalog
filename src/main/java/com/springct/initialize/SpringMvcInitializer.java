package com.springct.initialize;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import com.springct.config.AppConfig;

public class SpringMvcInitializer extends AbstractAnnotationConfigDispatcherServletInitializer  {

	private static final Logger LOGGER = LoggerFactory.getLogger(SpringMvcInitializer.class);
	
	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] { AppConfig.class };
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return null;
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] { "/" };
	}

	/*@Override
	protected void customizeRegistration(ServletRegistration.Dynamic registration) {
		try {
			registration.setMultipartConfig(getMultipartConfigElement());
		} catch (IOException e) {
			LOGGER.error("Error while setup multipart config : "+e);
		}
	}

	private MultipartConfigElement getMultipartConfigElement() throws IOException {
		Resource resource = new ClassPathResource("app.properties");
		Properties props = PropertiesLoaderUtils.loadProperties(resource);
		int maxFileSize = Integer.parseInt(props.getProperty("max_file_size"));
		int maxRequestSize = Integer.parseInt(props.getProperty("max_request_size"));
		String filePath = props.getProperty("file_location");
		MultipartConfigElement multipartConfigElement = new MultipartConfigElement(filePath, maxFileSize,
				maxRequestSize, 0);
		return multipartConfigElement;
	}*/
}