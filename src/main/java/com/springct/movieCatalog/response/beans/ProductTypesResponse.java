package com.springct.movieCatalog.response.beans;

import java.math.BigInteger;

/**
 * Response class which will mention all the supported inventory device types.
 * 
 * @author mandar.muthe
 */

public class ProductTypesResponse {

	private BigInteger id;
	private String name;

	/***
	 * Default constructor
	 ***/
	public ProductTypesResponse() {

	}


	/**
	 * Parameterized constructor to fill all the values.
	 */
	
	public BigInteger getId() {
		return id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

}
