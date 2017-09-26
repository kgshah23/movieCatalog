package com.springct.movieCatalog.response.beans;

import java.math.BigInteger;

/**
 * Response class which will mention all the supported inventory device types.
 * 
 * @author mandar.muthe
 */

public class InventoryDeviceTypesResponse {

	private BigInteger deviceTypeId;
	private String name;
	private Integer category;

	/***
	 * Default constructor
	 ***/
	public InventoryDeviceTypesResponse() {

	}

	/**
	 * Parameterized constructor to fill all the values.
	 */
	public InventoryDeviceTypesResponse(BigInteger deviceTypeId, String name, Integer category) {
		this.deviceTypeId = deviceTypeId;
		this.name = name;
		this.category = category;
	}

	public BigInteger getDeviceTypeId() {
		return deviceTypeId;
	}

	public void setDeviceTypeId(BigInteger deviceTypeId) {
		this.deviceTypeId = deviceTypeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getCategory() {
		return category;
	}

	public void setCategory(Integer category) {
		this.category = category;
	}

}
