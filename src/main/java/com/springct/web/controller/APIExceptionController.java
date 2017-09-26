package com.springct.web.controller;

import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartException;

import com.springct.model.ResponseBean;
import com.springct.movieCatalog.exception.MovieCatalogException;

/**
 * Central exception controller class for all types of exceptions.
 * 
 * @author shweta.paigude
 */
@ControllerAdvice
public class APIExceptionController {

	private static final Logger logger = LoggerFactory.getLogger(APIExceptionController.class);
	
	private static final int MULTIPART_FILE = 10;

	@ExceptionHandler(value = HibernateException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	ResponseBean handleException(HibernateException dbException) {
		logger.error("Error in controller", dbException);
		return ResponseBean.sendFailureResponseBean(HttpStatus.INTERNAL_SERVER_ERROR.value(), 0, null);
	}

	@ExceptionHandler(value = Throwable.class)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	ResponseBean handleException(Throwable exception) {
		logger.error("Error in controller", exception);
		return ResponseBean.sendFailureResponseBean(HttpStatus.INTERNAL_SERVER_ERROR.value(), 0, null);
	}
	
	@ExceptionHandler(TypeMismatchException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	ResponseBean handleException(Exception exception) {
		logger.error("Error in controller", exception);
		return ResponseBean.sendFailureResponseBean(HttpStatus.BAD_REQUEST.value(), 0, null);
	}
	
	@ExceptionHandler(value = AccessDeniedException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	ResponseBean handleException(AccessDeniedException exception) {
		logger.error("Error in controller", exception);
		return ResponseBean.sendFailureResponseBean(HttpStatus.FORBIDDEN.value(), 0, null);
	}

	@ExceptionHandler(value = HttpMessageNotReadableException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	ResponseBean handleException(HttpMessageNotReadableException exception) {
		logger.error("Error in controller", exception);
		return ResponseBean.sendFailureResponseBean(HttpStatus.BAD_REQUEST.value(), 0, null);
	}

	@ExceptionHandler(value = HttpMediaTypeNotSupportedException.class)
	@ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
	@ResponseBody
	ResponseBean handleException(HttpMediaTypeNotSupportedException exception) {
		logger.error("Error in controller", exception);
		return ResponseBean.sendFailureResponseBean(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), 0, null);
	}

	@ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
	@ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
	@ResponseBody
	ResponseBean handleException(HttpRequestMethodNotSupportedException exception) {
		logger.error("Error in controller", exception);
		return ResponseBean.sendFailureResponseBean(HttpStatus.METHOD_NOT_ALLOWED.value(), 0, null);
	}
	
	@ExceptionHandler(value = MultipartException.class)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	ResponseBean handleException(MultipartException exception) {
		logger.error("Error in controller", exception);
		return ResponseBean.sendFailureResponseBean(HttpStatus.BAD_REQUEST.value(), MULTIPART_FILE, exception.getCause().getMessage());
	}

	/*@ExceptionHandler(value = MovieCatalogController.class)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	ResponseBean handleException(MovieCatalogException movieCatalogException) {
		logger.error("Error in controller", movieCatalogException);
		return movieCatalogException.getResponseBean();
	}*/
	

}
