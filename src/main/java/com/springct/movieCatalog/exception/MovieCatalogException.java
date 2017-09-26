package com.springct.movieCatalog.exception;

import org.apache.commons.lang3.StringUtils;

import com.springct.model.ResponseBean;

/**
 * Inventory Exception class for Inventory module exceptions.
 *
 * @author shweta.paigude
 */
public class MovieCatalogException extends Exception {

	private static final long serialVersionUID = 1L;

	/**
	 * Possible error codes
	 */
	public static final int INSUFFICIENT_DATA = 601;


	private String message;

	private ResponseBean responseBean;

	public MovieCatalogException() {
	}

	public MovieCatalogException(Throwable cause) {
		super(cause);
		String msg = cause.getMessage();
		if (msg == null) {
			msg = cause.getClass().getName();
		}
		this.message = msg;
	}

	public MovieCatalogException(String msg) {
		super(msg);
		this.message = msg;
	}

	public MovieCatalogException(ResponseBean responseBean) {
		super(StringUtils.isEmpty(responseBean.getError_description()) ? "" : responseBean.getError_description());
		this.responseBean = responseBean;
	}

	public String getMessage() {
		return this.message;
	}

	public ResponseBean getResponseBean() {
		return responseBean;
	}

	public void setResponseBean(ResponseBean responseBean) {
		this.responseBean = responseBean;
	}
}
