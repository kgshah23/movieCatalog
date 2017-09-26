package com.springct.model;

import java.io.Serializable;

public abstract class RequestBean implements Serializable {
	private static final long serialVersionUID = 1L;

	public abstract void validateRequest() throws Exception;
}
