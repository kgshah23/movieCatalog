package com.springct.movieCatalog.response.beans;

import java.math.BigInteger;
import java.sql.Timestamp;

/**
 * Response class for inventory details.
 * 
 * @author mandar.muthe
 */

public class InventoryDetailResponse {
	BigInteger inventoryId;
	String serialNumber;
	String description;
	String username;
	String password;
	String batteryStatus;
	Integer state;
	String brand;
	Timestamp batteryDate;
	String name;
	BigInteger deviceTypeId;
	Integer status;
	Integer allocationStatus;
	Integer keepAlive;
	Timestamp creationDate;
	Integer locationType;
	BigInteger locationReferenceId;
	String locationRemarks;
	Timestamp allocationDate;
	BigInteger locationStatus;
	
	/*** 
	 * Default constructor
	 * ***/
	public InventoryDetailResponse(){
		
	}

	/**
	 * Parameterized constructor to fill all the values.
	 */
	public InventoryDetailResponse(BigInteger inventoryId, String serialNumber, String description, String username,
			String password, String betteryStatus, Integer state, String brand, Timestamp batteryDate, String name,
			BigInteger deviceTypeId, Integer status, Integer allocationStatus, Integer keepAlive,
			Timestamp creationDate, Integer locationType, BigInteger locationReferenceId, String locationRemarks,
			Timestamp allocationDate) {
		super();
		this.inventoryId = inventoryId;
		this.serialNumber = serialNumber;
		this.description = description;
		this.username = username;
		this.password = password;
		this.batteryStatus = betteryStatus;
		this.state = state;
		this.brand = brand;
		this.batteryDate = batteryDate;
		this.name = name;
		this.deviceTypeId = deviceTypeId;
		this.status = status;
		this.allocationStatus = allocationStatus;
		this.keepAlive = keepAlive;
		this.creationDate = creationDate;
		this.locationType = locationType;
		this.locationReferenceId = locationReferenceId;
		this.locationRemarks = locationRemarks;
		this.allocationDate = allocationDate;
	}

	public BigInteger getInventoryId() {
		return inventoryId;
	}

	public void setInventoryId(BigInteger inventoryId) {
		this.inventoryId = inventoryId;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public Timestamp getBatteryDate() {
		return batteryDate;
	}

	public void setBatteryDate(Timestamp batteryDate) {
		this.batteryDate = batteryDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigInteger getDeviceTypeId() {
		return deviceTypeId;
	}

	public void setDeviceTypeId(BigInteger deviceTypeId) {
		this.deviceTypeId = deviceTypeId;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getAllocationStatus() {
		return allocationStatus;
	}

	public void setAllocationStatus(Integer allocationStatus) {
		this.allocationStatus = allocationStatus;
	}

	public Integer getKeepAlive() {
		return keepAlive;
	}

	public void setKeepAlive(Integer keepAlive) {
		this.keepAlive = keepAlive;
	}

	public Timestamp getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Timestamp creationDate) {
		this.creationDate = creationDate;
	}

	public Integer getLocationType() {
		return locationType;
	}

	public void setLocationType(Integer locationType) {
		this.locationType = locationType;
	}

	public BigInteger getLocationReferenceId() {
		return locationReferenceId;
	}

	public void setLocationReferenceId(BigInteger locationReferenceId) {
		this.locationReferenceId = locationReferenceId;
	}

	public String getLocationRemarks() {
		return locationRemarks;
	}

	public void setLocationRemarks(String locationRemarks) {
		this.locationRemarks = locationRemarks;
	}

	public Timestamp getAllocationDate() {
		return allocationDate;
	}

	public void setAllocationDate(Timestamp allocationDate) {
		this.allocationDate = allocationDate;
	}

	public String getBatteryStatus() {
		return batteryStatus;
	}

	public void setBatteryStatus(String batteryStatus) {
		this.batteryStatus = batteryStatus;
	}

	public BigInteger getLocationStatus() {
		return locationStatus;
	}

	public void setLocationStatus(BigInteger locationStatus) {
		this.locationStatus = locationStatus;
	}
}
