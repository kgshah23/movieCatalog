package com.springct.model;

public class ResponseBean {

	/**
	 * Constants for Server Codes
	 */
	public static final int SERVER_OK = 200;
	public static final int SERVER_ERROR_BAD_REQUEST = 400;
	public static final int SERVER_ERROR_AUTHENTICATION_FAILURE = 401;
	public static final int SERVER_ERROR_UNPROCESSABLE_ENTITY = 422;
	public static final int SERVER_ERROR_INTERNAL_SERVER_ERROR = 500;
	public static final int RESOURCE_NOT_FOUND = 404;
	public static final int RESOURCE_CREATED = 201;
	public static final int RESOURCE_CONFLICT = 409;
	public static final int NOT_REGISTERED = 412;
	public static final int FORBIDDEN = 403;

	private int statusCode;
	private int error;
	private Object response;
	private String error_description;

	public ResponseBean(int status, int error, String error_description) {
		this.statusCode = status;
		this.error = error;
		this.error_description = error_description;		
	}
	
	public ResponseBean(int status, int error, Object response) {
		this.statusCode = status;
		this.error = error;
		this.response = response;		
	}

	public static ResponseBean sendSuccessResponseBean(Object response) {
		ResponseBean successBean = new ResponseBean(SERVER_OK, 0, response);
		return successBean;
	}

	public static ResponseBean sendFailureResponseBean(int statusCode, int error, String error_description) {
		ResponseBean failureBean = new ResponseBean(statusCode,error, error_description);
		return failureBean;
	}

	/**
	 * @return the statusCode
	 */
	public int getStatusCode() {
		return statusCode;
	}

	/**
	 * @param statusCode the statusCode to set
	 */
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public int getError() {
		return error;
	}

	public void setError(int error) {
		this.error = error;
	}

	public String getError_description() {
		return error_description;
	}

	public void setError_description(String error_description) {
		this.error_description = error_description;
	}

	/**
	 * @return the response
	 */
	public Object getResponse() {
		return response;
	}

	/**
	 * @param response the response to set
	 */
	public void setResponse(Object response) {
		this.response = response;
	}
}
