package com.springct.model;

import java.util.List;

public class GenericListRequest<T> {
	private List<T> data;

	public GenericListRequest() {

	}

	public GenericListRequest(List<T> data) {
		this.setData(data);
	}

	public List<T> getData() {
		return data;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

	
}
