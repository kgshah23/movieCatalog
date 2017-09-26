package com.springct.model;

import java.util.List;

public class GenericListResponseBean<T> {

	private List<T> data;

	private Long total;

	public GenericListResponseBean(List<T> data, Long total) {
		this.setData(data);
		this.total = total;
	}

	public GenericListResponseBean(List<T> data) {
		this.setData(data);
	}

	public List<T> getData() {
		return data;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

}
