package com.shiro;

import java.io.Serializable;

public class Principal implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6224337894876397353L;
	
	// 用户ID
	private Long id;
	// 用户名
	private String username;

	public Principal(Long id, String username) {
		this.id = id;
		this.username = username;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String toString() {
		return this.username;
	}

}
